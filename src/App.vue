<template>
  <v-container grid list-md text-xs-center id="app">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-toolbar class="white search-toolbar" floating dense @keydown.up.prevent="scrollUp" @keydown.down.prevent="scrollDown">
          <v-text-field v-model="searchString" prepend-icon="search" full-width hide-details single-line autofocus></v-text-field>
          <Jumper v-if="debounceIndicator"></Jumper>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <List :tabs="tabs" :bookmarks="bookmarks" :history="filteredHistory" :selected="selectedItemId"></List>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import List from './components/List.vue';
import Jumper from './components/Jumper.vue';

import contains from './util/contains';

export default {
  data() {
    return {
      searchString: '',
      tabs: [],
      bookmarks: [],
      fullHistory: [],
      filteredHistory: [],
      selectedItemId: null,
      selectedItemIndex: -1,
      debounceTimer: null,
      debounceIndicator: false
    };
  },

  computed: {
    consolidatedList() {
      return [...this.tabs, ...this.bookmarks, ...this.filteredHistory];
    }
  },

  methods: {
    scrollDown() {
      if (!this.selectedItemId) {
        this.selectedItemIndex = 0;
        this.selectedItemId = this.consolidatedList[this.selectedItemIndex].id;
      } else {
        if (this.consolidatedList[this.selectedItemIndex + 1]) {
          this.selectedItemIndex++;
          this.selectedItemId = this.consolidatedList[this.selectedItemIndex].id;
        }
      }
    },

    scrollUp() {
      if (!this.selectedItemId) {
        return;
      } else {
        if (this.consolidatedList[this.selectedItemIndex - 1]) {
          this.selectedItemIndex--;
          this.selectedItemId = this.consolidatedList[this.selectedItemIndex].id;
        }
      }
    }
  },

  mounted() {
    chrome.tabs.query({}, tabs => this.tabs = tabs);
    chrome.history.search({ text: '', maxResults: 0, startTime: 0 }, history => this.fullHistory = history);
  },

  watch: {
    searchString(newSearchString) {
      clearTimeout(this.debounceTimer);

      this.selectedItemId = null;
      this.selectedItemIndex = -1;

      if (newSearchString === '') {
        this.debounceIndicator = false;
        this.bookmarks = [];
        this.filteredHistory = [];
        chrome.tabs.query({}, tabs => this.tabs = tabs);
        return;
      }

      this.debounceIndicator = true;

      this.debounceTimer = setTimeout(() => {
        this.debounceIndicator = false;

        chrome.tabs.query({}, tabs => {
          this.tabs = tabs.filter(tab => contains(tab, newSearchString));
        });

        chrome.bookmarks.search(newSearchString, bookmarks => this.bookmarks = bookmarks);

        this.filteredHistory = this.fullHistory.filter(historyItem => {
          return contains(historyItem, newSearchString);
        }).slice(0, 20);

      }, 250);
    }
  },

  components: { List, Jumper }
}
</script>

<style lang="stylus">
@import '../node_modules/vuetify/src/stylus/main'

#app
  margin-top 20px

.search-toolbar
  width 50% !important

  .toolbar__content
    width 100%
</style>
