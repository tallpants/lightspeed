<template>
  <v-list subheader>
    <v-subheader>
      <v-icon>bookmark</v-icon> &nbsp; &nbsp; Bookmarks
    </v-subheader>
    <v-list-tile class="list-item" avatar v-for="bookmark of bookmarks" v-if="bookmark.url" :key="bookmark.id" @click="open(bookmark)">
      <v-list-tile-avatar>
        <img :src="`chrome://favicon/${bookmark.url}`">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ bookmark.title }} -
          <span class="url">{{ bookmark.url }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
  props: ['bookmarks'],

  methods: {
    open(bookmark) {
      window.location = bookmark.url;
    }
  }
}
</script>

<style lang="stylus">
.url
  color #999
</style>
