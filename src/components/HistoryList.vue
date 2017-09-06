<template>
  <v-list two-line subheader>
    <v-card v-for="historyItem of history" :key="historyItem.id" class="history-list-item" hover @click="open(historyItem)">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ historyItem.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <a :href="historyItem.url">{{ historyItem.url }}</a>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card>
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
.history-list-item
  margin-top 15px
  background-color #f48fb1
  &:hover
    background-color #f8bbd0
</style>
