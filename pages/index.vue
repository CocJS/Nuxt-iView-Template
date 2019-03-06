<template>
  <coc-main-master>
    <div class="container">
      <div class="row">
        <div class="col s12 coc-margin-top-3rem">
          <img
            v-coc-mouse-over = "'jello'"
            v-coc-mouse-leave = "'rubberBand'"
            v-coc-mouse-up = "'tada'"
            v-coc-mouse-down = "'flash'"
            :src="$coc.App.logo.primary"
            class = "col s6 push-s3 animated">
        </div>
        <div class="col s12 coc-margin-top-1rem">
          <h3 class="coc-primary-text text-code text-thin text-super center ">
            {{ $coc.App.name | CocCapitalizeName }}
          </h3>
        </div>
        <div class="col s12 coc-margin-top-1rem">
          <Divider orientation="left">Get Started</Divider>
          <Button
            to = "demo"
            size = "large">Demos</Button>
          <Button
            to = "/demo/validate"
            size = "large">Validation</Button>
        </div>
        <div class="col s12 coc-margin-top-1rem">
          <Divider orientation="left">Content</Divider>
          <coc-collapse
            title = "Utils and Modules"
            icon = "ivu-icon ivu-icon-ios-construct-outline">
            <div
              slot = "content"
              class ="coc-background-bg coc-standard-border-radius coc-border-1 coc-border-border row house-keeper">
              <coc-show-keys
                :limit = "5"
                :css-classes= "{
                  container: 'row house-keeper',
                  ulContainer: 'col s12 house-keeper',
                  buttonTypes : {
                    more : 'primary' , 
                    less : 'warning',
                    showAll: 'success',
                    hideAll: 'error'
                  },
                  buttonsSize : {
                    group : null
                  },
              }">
                <div
                  v-for = "(util, index) in utils"
                  :key = "index"
                  :slot = "index"
                  class = "coc-text-heading coc-text-hover-subtitle coc-smooth-font-size coc-divider-hover-bg coc-tiny-border-radius">
                  <nuxt-link
                    :to ="util.to"
                    class = "coc-primary-text coc-dark-primary-hover-text">
                    <span :class = "[util.icon, 'coc-text-normal-1', 'coc-padding-right-10px']"/>
                    <span>{{ util.name }}</span>
                  </nuxt-link>
                </div>
              </coc-show-keys>
            </div>
          </coc-collapse>
          <coc-collapse
            class = "coc-margin-y-5px"
            title = "Components"
            icon = "ivu-icon ivu-icon-ios-code-working">
            <div
              slot = "content"
              class ="coc-background-bg coc-standard-border-radius coc-border-1 coc-border-border row house-keeper">
              <coc-show-keys
                :limit = "5"
                :css-classes= "{
                  container: 'row house-keeper',
                  ulContainer: 'col s12 house-keeper',
                  buttonTypes : {
                    more : 'primary' , 
                    less : 'warning',
                    showAll: 'success',
                    hideAll: 'error'
                  },
                  buttonsSize : {
                    group : null
                  },
              }">
                <div
                  v-for = "(util, index) in utils"
                  :key = "index"
                  :slot = "index"
                  class = "coc-text-heading coc-text-hover-subtitle coc-smooth-font-size coc-divider-hover-bg coc-tiny-border-radius">
                  <nuxt-link
                    :to ="util.to"
                    class = "coc-primary-text coc-dark-primary-hover-text">
                    <span :class = "[util.icon, 'coc-text-normal-1', 'coc-padding-right-10px']"/>
                    <span>{{ util.name }}</span>
                  </nuxt-link>
                </div>
              </coc-show-keys>
            </div>
          </coc-collapse>
          <coc-collapse
            class = "coc-margin-y-5px"
            title = "Directives"
            icon = "ivu-icon ivu-icon-ios-outlet-outline">
            <div
              slot = "content"
              class ="coc-background-bg coc-standard-border-radius coc-border-1 coc-border-border row house-keeper">
              <coc-show-keys
                :limit = "5"
                :css-classes= "{
                  container: 'row house-keeper',
                  ulContainer: 'col s12 house-keeper',
                  buttonTypes : {
                    more : 'primary' , 
                    less : 'warning',
                    showAll: 'success',
                    hideAll: 'error'
                  },
                  buttonsSize : {
                    group : null
                  },
              }">
                <div
                  v-for = "(util, index) in utils"
                  :key = "index"
                  :slot = "index"
                  class = "coc-text-heading coc-text-hover-subtitle coc-smooth-font-size coc-divider-hover-bg coc-tiny-border-radius">
                  <nuxt-link
                    :to ="util.to"
                    class = "coc-primary-text coc-dark-primary-hover-text">
                    <span :class = "[util.icon, 'coc-text-normal-1', 'coc-padding-right-10px']"/>
                    <span>{{ util.name }}</span>
                  </nuxt-link>
                </div>
              </coc-show-keys>
            </div>
          </coc-collapse>
          <coc-collapse
            class = "coc-margin-y-5px"
            title = "Filters"
            icon = "ivu-icon ivu-icon-ios-glasses-outline">
            <div
              slot = "content"
              class ="coc-background-bg coc-standard-border-radius coc-border-1 coc-border-border row house-keeper">
              <coc-show-keys
                :limit = "5"
                :css-classes= "{
                  container: 'row house-keeper',
                  ulContainer: 'col s12 house-keeper',
                  buttonTypes : {
                    more : 'primary' , 
                    less : 'warning',
                    showAll: 'success',
                    hideAll: 'error'
                  },
                  buttonsSize : {
                    group : null
                  },
              }">
                <div
                  v-for = "(util, index) in utils"
                  :key = "index"
                  :slot = "index"
                  class = "coc-text-heading coc-text-hover-subtitle coc-smooth-font-size coc-divider-hover-bg coc-tiny-border-radius">
                  <nuxt-link
                    :to ="util.to"
                    class = "coc-primary-text coc-dark-primary-hover-text">
                    <span :class = "[util.icon, 'coc-text-normal-1', 'coc-padding-right-10px']"/>
                    <span>{{ util.name }}</span>
                  </nuxt-link>
                </div>
              </coc-show-keys>
            </div>
          </coc-collapse>
        </div>
      </div>
    </div>
  </coc-main-master>
</template>

<script>
export default {
  name: 'Index',

  data() {
    return {
      utils: [
        {
          name: 'Validator',
          to: '/demo/validate',
          icon: 'ivu-icon ivu-icon-ios-bug-outline'
        },
        {
          name: 'Events',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-stopwatch-outline'
        },
        {
          name: 'Form Controller',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-game-controller-a-outline'
        },
        {
          name: 'Domer $',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-color-wand-outline'
        },
        {
          name: 'Objects',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-archive-outline'
        },
        {
          name: 'Arrays',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-albums-outline'
        },
        {
          name: 'Queue',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-list'
        },
        {
          name: 'Circular Queue',
          to: '/demo/modules/queue/circular',
          icon: 'ivu-icon ivu-icon-ios-repeat'
        },
        {
          name: 'Logger',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-warning-outline'
        },
        {
          name: 'Docker',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-more-outline'
        },
        {
          name: 'Core',
          to: '/validate',
          icon: 'ivu-icon ivu-icon-ios-planet-outline'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
</style>
