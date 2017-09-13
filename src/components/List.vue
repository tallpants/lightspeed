<template>
  <div>
    <v-list subheader>
      <v-subheader>
        <v-icon>tab</v-icon> &nbsp; &nbsp; Tabs
      </v-subheader>
      <v-list-tile class="list-item" avatar v-for="tab of tabs" :key="tab.id" @click="focusTab(tab)">
        <v-list-tile-avatar>
          <img :src="`chrome://favicon/${tab.url}`">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ tab.title}} -
            <span class="url">{{ tab.url }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list subheader>
      <v-subheader>
        <v-icon>bookmark</v-icon> &nbsp; &nbsp; Bookmarks
      </v-subheader>
      <v-list-tile class="list-item" avatar v-for="bookmark of bookmarks" :key="bookmark.id" @click="open(bookmark)">
        <v-list-tile-avatar>
          <img :src="`chrome://favicon/${bookmark.url}`">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ bookmark.title}} -
            <span class="url">{{ bookmark.url }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list subheader>
      <v-subheader>
        <v-icon>history</v-icon> &nbsp; &nbsp; History
      </v-subheader>
      <v-list-tile class="list-item" avatar v-for="historyItem of history" :key="historyItem.id" @click="open(historyItem)">
        <v-list-tile-avatar>
          <img :src="`chrome://favicon/${historyItem.url}`">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-if="historyItem.title">{{ historyItem.title }} -
            <span class="url">{{ historyItem.url }}</span>
          </v-list-tile-title>
          <v-list-tile-title v-else>
            <span class="url">{{ historyItem.url }}</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  methods: {
    focusTab(tab) {
      chrome.tabs.update(tab.id, { active: true });
      chrome.windows.getCurrent({}, currentWindow => {
        if (currentWindow.id !== tab.windowId) {
          chrome.windows.update(tab.windowId, { focused: true });
        }
      });
    },

    open(item) {
      window.location = item.url;
    }
  },
  props: ['tabs', 'bookmarks', 'history']
}
</script>

<style lang="stylus">
.list-item
  margin-left 30px

.list__tile
  height 48px
  font-size 14px

  .avatar
    min-width 0px
    max-width 32px

    img
      height 16px
      width 16px
      border-radius 0

.url
  color #999
</style>
