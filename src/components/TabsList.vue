<template>
  <v-list two-line subheader>
    <ListItem v-for="tab of tabs" :tab="tab" :key="tab.id"></ListItem>
  </v-list>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  props: ['tabs'],
  components: { ListItem }
}
</script>

<style lang="stylus">
.list-item
  margin-top 15px
</style>
