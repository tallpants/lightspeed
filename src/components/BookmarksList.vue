<template>
  <v-list two line subheader>
    <v-card v-for="bookmark of bookmarks" v-if="bookmark.url" :key="bookmark.id" class="bookmark-list-item" hover @click="open(bookmark)">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ bookmark.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <a :href="bookmark.url">{{ bookmark.url }}</a>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card>
  </v-list>
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
.bookmark-list-item
  margin-top 15px
  background-color #aed581
  &:hover
    background-color #dcedc8
</style>
