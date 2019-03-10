<template>
  <nav 
    :class="classes.nav" 
    class="row">
    <slot 
      name ="leftNav" >
      <div class="left col l3 s8">
        <nuxt-link
          to="/"
          class="text-super text-code coc-primary-text coc-nav-brand col coc-padding-0"
        >
          <coc-avatar
            v-coc-mouse-over="'jello'"
            v-coc-mouse-leave="'rubberBand'"
            :source="$coc.App.logo.primary"
            class="logo col coc-padding-0 animated"/>
          <span
            class="name col coc-padding-x-15px coc-padding-y-0 coc-margin-0"
          >{{ $coc.App.name }}</span>
        </nuxt-link>
      </div>
    </slot>
    <slot name = "middleNav">
      <div class="coc-margin-top-14px col l5 hide-on-med-and-down">
        <coc-pure-input
          v-model="cocPureInput"
          placeholder = "Search"
          size = "large"
          icon = "ivu-icon ivu-icon-ios-search"
        /> 
      </div>
    </slot>
    <slot 
      name="rightNav"> 
      <div class="right col l3 s4 coc-margin-top-11px">
        <div 
          class="right"
          style="position : absolute;">
         
          <Dropdown>
            <div class="row house-keeper">
              <Button 
                type="primary"
                style = " float: left; margin-right: -17px; margin-top: 10px; height: 30px"
                class="coc-border-0 col coc-padding-y-6px coc-padding-left-10px coc-padding-right-25px"
                shape = "circle"
                size = "large">
                <Icon type="ios-arrow-down"/>
              </Button>
              <coc-avatar
                v-coc-mouse-over="'jello'"
                v-coc-mouse-leave="'rubberBand'"
                border-radius = "circle"
                source="https://pbs.twimg.com/profile_images/570864141801533440/qqzM5W59_400x400.jpeg"
                class="coc-padding-0 animated col house-keeper right"/>
            </div>
            <DropdownMenu slot="list">
              <DropdownItem>Inbox</DropdownItem>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
    return {
      cocPureInput: null
    }
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08) !important;
}
.coc-nav-brand {
  margin-left: 15px;
  margin-top: 15px;
  height: 40px;
}
.coc-nav-brand .logo {
  width: 40px !important;
  height: 40px !important;
  background-color: transparent;
}
.coc-nav-brand .name {
  height: 40px !important;
  line-height: 40px;
}
</style>
