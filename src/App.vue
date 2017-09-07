<template>
  <v-container grid-list-md text-xs-center id="app">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-toolbar class="white search-toolbar" floating dense>
          <v-text-field v-model="searchString" prepend-icon="search" full-width hide-details single-line autofocus></v-text-field>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <TabsList :tabs="tabs"></TabsList>
        <BookmarksList :bookmarks="bookmarks"></BookmarksList>
        <HistoryList :history="filteredHistory"></HistoryList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TabsList from './components/TabsList.vue';
import BookmarksList from './components/BookmarksList.vue';
import HistoryList from './components/HistoryList.vue';

export default {
  data() {
    return {
      searchString: '',
      tabs: [],
      bookmarks: [],
      rawHistory: [],
      filteredHistory: []
    };
  },

  watch: {
    searchString(newSearchString) {
      if (newSearchString === '') {
        this.bookmarks = [];
        this.filteredHistory = [];
      } else {
        // Load all the bookmarks that match the search string when the user types
        chrome.bookmarks.search(newSearchString, bookmarks => {
          this.bookmarks = bookmarks;
        });

        // Filter the tabs according to the search string a user types.
        chrome.tabs.query({}, tabs => {
          this.tabs = tabs.filter(tab => {
            return (
              tab.title.toLowerCase().includes(newSearchString.toLowerCase()) ||
              tab.url.toLowerCase().includes(newSearchString.toLowerCase())
            );
          });
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
      }
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

  components: { TabsList, BookmarksList, HistoryList }
};
</script>

<style lang="stylus">
@import './stylus/main'

#app
  margin-top 20px

.search-toolbar
  width 50% !important

  .toolbar__content
    width 100%

.list-item
  margin-left 30px

.list__tile
  height 48px
  font-size 14px

  .avatar
    min-width 0px
    max-width 32px
    img
      height 16px
      width 16px
      border-radius 0
</style>
