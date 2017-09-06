<template>
  <v-list subheader>
    <v-list-tile avatar v-for="item of history" :key="item.id" @click="open(item)">
      <v-list-tile-avatar>
        <v-icon>history</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-if="item.title">
          {{ item.title }} -
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
        <v-list-tile-title v-else>
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['history'],

  methods: {
    open(historyItem) {
      window.location = historyItem.url;
    }
  }
}
</script>

<style lang="stylus">
.url
  color #999
</style>
