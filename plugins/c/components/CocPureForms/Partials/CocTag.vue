<template>
  <div>
    <span
      :class="[`coc-${color}-section-${type}`,`coc-${borderRadius}-border-radius`,`coc-text-${fontSize}`]"
      class="coc-padding-4px col s12"
      style="display: inline-block; border : 1px solid black;"
    >
      <div class="col s12">
        <coc-avatar
          v-if = "Avatar"
          v-bind = "Avatar"
        />
        <slot 
          name="default" 
          class=""/>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CocTag',
  props: {
    color: {
      type: String,
      default: 'primary',
      required: true
    },
    type: {
      type: String,
      default: 'dark',
      required: true
    },
    borderRadius: {
      type: String,
      default: 'xs',
      required: true
    },
    fontSize: {
      type: String,
      default: 'normal',
      required: true
    },
    Avatar: {
      type: Object,
      default: null
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang="css" scoped>
</style>
