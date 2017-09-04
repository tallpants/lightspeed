<template>
    <List :tabs="tabs">
    </List>
</template>

<script>
import List from './components/List.vue';

export default {
    data() {
        return {
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
