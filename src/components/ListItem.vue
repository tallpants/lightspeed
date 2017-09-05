<template>
  <v-card class="list-item">
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title>{{ tab.title }}</v-list-tile-title>
        <v-list-tile-sub-title>
          <a :href="tab.url">{{ tab.url }}</a>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-card>
</template>

<script>
export default {
  props: ['tab']
}
}
</script>

<style lang="stylus">
.list-item {
  margin-top: 15px;
}
</style>
