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
        <List :tabs="tabs" :searchString="searchString"></List>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import List from './components/List.vue';

export default {
  data() {
    return {
      searchString: '',
      tabs: []
    };
  },

  mounted() {
    chrome.tabs.query({}, tabs => {
      this.tabs = tabs;
    });
  },

  components: { List }
};
</script>

<style lang="stylus">
@import './stylus/main'

#app {
  margin-top: 20px;
}

.search-toolbar {
  width: 50% !important;

  .toolbar__content {
    width: 100%;
  }
}
</style>
