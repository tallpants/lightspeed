<template>
  <v-list subheader>
    <v-subheader>
      <v-icon>history</v-icon> &nbsp; &nbsp; History
    </v-subheader>
    <v-list-tile class="list-item" avatar v-for="item of history" :key="item.id" @click="open(item)">
      <v-list-tile-avatar>
        <img :src="`chrome://favicon/${item.url}`">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-if="item.title">{{ item.title }} -
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
        <v-list-tile-title v-else>
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
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
