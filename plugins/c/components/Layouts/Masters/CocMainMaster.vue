<template>
  <div>
    <coc-watch-my-window v-model = "windowWatcher"/>
    <coc-master-nav>
      <slot name = "nav"/>
    </coc-master-nav>
    <main>
      <slot/>
      <coc-layout-docker 
        :window-watcher = "windowWatcher" 
        v-bind = "docker"/>
    </main>
    <coc-master-footer>
      <slot name = "footer"/>
    </coc-master-footer>
  </div>
</template>

<script>
import CocMasterNav from '../Partials/CocMasterNav.vue'
import CocMasterFooter from '../Partials/CocMasterFooter.vue'
export default {
  name: 'CocMainMaster',
  components: {
    CocMasterNav,
    CocMasterFooter
  },
  props: {
    docker: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      windowWatcher: null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
