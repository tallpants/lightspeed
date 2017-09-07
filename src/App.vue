<template>
  <v-container grid-list-md text-xs-center id="app">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-toolbar class="white search-toolbar" floating dense>
          <v-text-field v-model="searchString" @keypress.enter="openFirstItem" prepend-icon="search" full-width hide-details single-line autofocus></v-text-field>
          <jumper v-if="debounceIndicator"></jumper>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <TabsList :tabs="tabs" ref="TabsListRef"></TabsList>
        <BookmarksList :bookmarks="bookmarks" ref="BookmarksListRef"></BookmarksList>
        <HistoryList :history="filteredHistory" ref="HistoryListRef"></HistoryList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TabsList from './components/TabsList.vue';
import BookmarksList from './components/BookmarksList.vue';
import HistoryList from './components/HistoryList.vue';
import Jumper from './components/Jumper.vue';

export default {
  data() {
    return {
      searchString: '',
      tabs: [],
      bookmarks: [],
      rawHistory: [],
      filteredHistory: [],
      debounceTimer: null,
      debounceIndicator: false
    };
  },

  methods: {
    openFirstItem() {
      if (this.tabs.length !== 0) {
        this.$refs.TabsListRef.focus(this.tabs[0]);
      } else if (this.bookmarks.length !== 0) {
        this.$refs.BookmarksListRef.open(this.bookmarks[0]);
      } else if (this.filteredHistory.length !== 0) {
        this.$refs.HistoryListRef.open(this.filteredHistory[0]);
      }
    }
  },

  watch: {
    searchString(newSearchString) {
      clearTimeout(this.debounceTimer);

      if (newSearchString === '') {
        this.bookmarks = [];
        this.filteredHistory = [];

        chrome.tabs.query({}, tabs => {
          this.tabs = tabs.filter(tab => {
            return (
              tab.title.toLowerCase().includes(newSearchString.toLowerCase()) ||
              tab.url.toLowerCase().includes(newSearchString.toLowerCase())
            );
          });
        });

        return;
      }

      this.debounceIndicator = true;

      this.debounceTimer = setTimeout(() => {
        this.debounceIndicator = false;

        // Filter the tabs according to the search string a user types.
        chrome.tabs.query({}, tabs => {
          this.tabs = tabs.filter(tab => {
            return (
              tab.title.toLowerCase().includes(newSearchString.toLowerCase()) ||
              tab.url.toLowerCase().includes(newSearchString.toLowerCase())
            );
          });
        });

        // Load all the bookmarks that match the search string when the user types
        chrome.bookmarks.search(newSearchString, bookmarks => {
          this.bookmarks = bookmarks;
        });

        // Filter history according to the search string the user types
        this.filteredHistory = this.rawHistory.filter(historyItem => {
          if (historyItem.title) {
            return (
              historyItem.title.toLowerCase().includes(newSearchString.toLowerCase()) ||
              historyItem.url.toLowerCase().includes(newSearchString.toLowerCase())
            );
          } else {
            return historyItem.url.toLowerCase().includes(newSearchString.toLowerCase());
          }
        }).slice(0, 20);
      }, 250);
    },
  },

  // Load all open tabs and history into state initially
  mounted() {
    chrome.tabs.query({}, tabs => {
      this.tabs = tabs;
    });

    chrome.history.search({ text: '', maxResults: 0, startTime: 0 }, history => {
      this.rawHistory = history;
    })
  },

  components: { TabsList, BookmarksList, HistoryList, Jumper }
};
</script>

<style lang="stylus">
@import './styles/main'
@import './styles/app'
@import './styles/list'
</style>
