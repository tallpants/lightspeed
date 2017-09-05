<template>
  <v-card class="list-item" @click="focus(tab)">
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{ tab.title }}</v-list-tile-title>
        <v-list-tile-sub-title>
          <a :href="tab.url">{{ tab.url }}</a>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-card>
</template>

<script>
export default {
  props: ['tab'],
  methods: {
    focus(tab) {
      chrome.tabs.update(tab.id, { active: true });
    }
  }
}
</script>

<style lang="stylus">
.list-item {
  margin-top: 15px;
}
</style>
