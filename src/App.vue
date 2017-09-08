<template>
  <v-container grid list-md text-xs-center id="app">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-toolbar class="white search-toolbar" floating dense>
          <v-text-field v-model="searchString" @keyup.enter="openFirstItem" prepend-icon="search" full-width hide-details single-line autofocus></v-text-field>
          <Jumper v-if="debounceIndicator"></Jumper>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <List icon="tab" title="Tabs" :items="tabs" :open="focusTab"></List>
        <List icon="bookmark" title="Bookmarks" :items="bookmarks" :open="openItem"></List>
        <List icon="history" title="History" :items="filteredHistory" :open="openItem"></List>
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
      debounceTimer: null,
      debounceIndicator: false
    };
  },

  methods: {
    focusTab(tab) {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.getCurrent({}, currentWindow => {
        if (currentWindow.id !== tab.windowId) {
          chrome.windows.update(tab.windowId, { focused: true });
        }
      });
    },

    openItem(item) {
      window.location = item.url;
    },

    openFirstItem() {
      if (this.tabs.length !== 0) {
        this.focusTab(this.tabs[0]);
      } else if (this.bookmarks.length !== 0) {
        this.openItem(this.bookmarks[0]);
      } else if (this.filteredHistory.length !== 0) {
        this.openItem(this.filteredHistory[0]);
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
