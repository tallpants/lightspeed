<template>
  <v-list subheader>
    <v-subheader>
      <v-icon>tab</v-icon> &nbsp; &nbsp; Tabs
    </v-subheader>
    <v-list-tile class="list-item" avatar v-for="tab of tabs" :key="tab.id" @click="focus(tab)">
      <v-list-tile-avatar>
        <img :src="`chrome://favicon/${tab.url}`">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ tab.title }} -
          <span class="url">{{ tab.url }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
</template>

<script>
export default {
  props: ['tabs'],

  methods: {
    focus(tab) {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.getCurrent({}, currentWindow => {
        if (currentWindow.id !== tab.windowId) {
          chrome.windows.update(tab.windowId, { focused: true });
        }
      });
    }
  }
}
</script>
