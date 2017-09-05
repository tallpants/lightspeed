<template>
  <div>
    <input v-model="searchString">
    <List :tabs="tabs" :searchString="searchString">
    </List>
  </div>
</template>

<script>
import List from './components/List.vue';

export default {
  data() {
    return {
      searchString: '',
      tabs: []
    };
  },
  mounted() {
    chrome.tabs.query({}, tabs => {
      this.tabs = tabs;
    });
  },
  components: { List }
}
</script>
