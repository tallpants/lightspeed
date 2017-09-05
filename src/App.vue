<template>
  <v-container grid-list-md text-xs-center id="app">
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-toolbar class="white" floating dense>
          <v-text-field v-model="searchString" prepend-icon="search" class="search-box" hide-details single-line></v-text-field>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
};
</script>

<style lang="stylus">
@import './stylus/main'

#app {
  margin-top: 20px;
}

.search-box {
  width: 600px;

  @media (max-width: 960px) {
    width: 400px;
  }

  @media (max-width: 600px) {
    width: 300px;
  }
}
</style>
