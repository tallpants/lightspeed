<template>
  <v-list two-line subheader>
    <v-card v-for="tab of tabs" :key="tab.id" class="list-item" hover @click="focus(tab)">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ tab.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <a :href="tab.url">{{ tab.url }}</a>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-card>
  </v-list>
</template>

<script>
export default {
  props: ['tabs'],

  methods: {
    focus(tab) {
      chrome.tabs.update(tab.id, { active: true });
    }
  }
}
</script>

<style lang="stylus">
.list-item
  margin-top 15px
  background-color #e3ffff
  &:hover
    background-color #B3E5FC
</style>
