<template>
  <v-list two-line subheader>
    <ListItem v-for="tab of tabs" v-if="tabTitleContains(tab, searchString)" :tab="tab" :key="tab.id"></ListItem>
  </v-list>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  props: ['tabs', 'searchString'],
  methods: {
    tabTitleContains(tab, searchString) {
      return tab.title.toLowerCase().includes(searchString.toLowerCase());
    }
  },
  components: { ListItem }
}
</script>

<style lang="stylus">
.list-item
  margin-top 15px
</style>
