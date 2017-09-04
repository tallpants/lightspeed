<template>
  <ul>
    <ListItem v-for="tab of tabs" :tab="tab" :key="tab.id"></ListItem>
  </ul>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  props: ['tabs'],
  components: { ListItem }
};
</script>
