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
        <HistoryList :history="history"></HistoryList>
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
      history: []
    };
  },

  watch: {
    searchString(newSearchString) {
      // Load all the bookmarks that match the search string into state when the user types.
      if (newSearchString === '') {
        this.bookmarks = [];
        this.history = [];
      } else {
        chrome.bookmarks.search(newSearchString, bookmarks => {
          this.bookmarks = bookmarks;
        });
        chrome.history.search({ text: newSearchString }, history => {
          this.history = history;
          console.log(history);
        });
      }

      // Filter the tabs according to the search string a user types.
      chrome.tabs.query({}, tabs => {
        this.tabs = tabs.filter(tab => {
          return (
            tab.title.toLowerCase().includes(newSearchString.toLowerCase()) ||
            tab.url.toLowerCase().includes(newSearchString.toLowerCase())
          );
        });
      });
    }
  },

  // Load all open tabs into state initially
  mounted() {
    chrome.tabs.query({}, tabs => {
      this.tabs = tabs;
    });
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
    width: 100%

.list__tile
  height 72px
</style>
