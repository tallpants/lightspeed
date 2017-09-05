<template>
  <ul>
    <ListItem v-for="tab of tabs" v-if="tabTitleContains(tab, searchString)" :tab="tab" :key="tab.id">
    </ListItem>
  </ul>
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
};
</script>
