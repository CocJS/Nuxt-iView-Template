<template>
  <nav :class = "classes.nav">
    <slot>
      <div class="col">
        <nuxt-link 
          to = "/" 
          class = "text-super text-code coc-primary-text coc-nav-brand col coc-padding-0">
          <img
            v-coc-mouse-over = "'jello'"
            v-coc-mouse-leave = "'rubberBand'"
            v-if = "$coc.App.logo && $coc.App.logo.primary"
            :src = "$coc.App.logo.primary" 
            class = "logo col coc-padding-0 animated">
          <span class = "name col coc-padding-x-10px coc-padding-y-0 coc-margin-0">{{ $coc.App.name }}</span>
        </nuxt-link>
      </div>
    </slot>
  </nav>
</template>

<script>
export default {
  name: 'CocMasterNav',
  props: {
    classes: {
      type: Object,
      default: () => {
        return {
          nav:
            'coc-background-bg coc-main-nav coc-primary-text coc-primary-hover-text row house-keeper'
        }
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="css" scoped>
.coc-main-nav {
  height: 70px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 123;
  box-shadow: 0 1px 1px rgba(0,0,0,0.08) !important;
}
.coc-nav-brand {
  margin-left: 15px;
  margin-top: 15px;
  height: 40px;
}
.coc-nav-brand .logo{
  width: 40px !important;
  height: 40px !important;
  background-color: transparent;
}
.coc-nav-brand .name{
  height: 40px !important;
  line-height: 40px;
}
</style>
