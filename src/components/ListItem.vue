<template>
  <li>
    {{ tab.id }} - {{ tab.title }} -
    <button @click="focus(tab)">Focus</button>
  </li>
</template>

<script>
export default {
  props: ['tab'],
  methods: {
    focus(tab) {
      chrome.tabs.update(tab.id, { active: true });
    }
  }
};
</script>
