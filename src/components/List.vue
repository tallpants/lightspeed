<template>
  <v-list subheader>
    <v-subheader>
      <v-icon>{{ icon }}</v-icon> &nbsp; &nbsp; {{ title }}
    </v-subheader>
    <v-list-tile class="list-item" avatar v-for="item of items" :key="item.id" @click="open(item)">
      <v-list-tile-avatar>
        <img :src="`chrome://favicon/${item.url}`">
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-if="item.title">{{ item.title }} -
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
        <v-list-tile-title v-else>
          <span class="url">{{ item.url }}</span>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['icon', 'title', 'items', 'open']
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
