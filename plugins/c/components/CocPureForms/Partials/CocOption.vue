<template>
  <div>
    <div>
      <p
        v-if = "resolveOption(init).isFirstInGroup"
        class = "text-thin coc-text-normal coc-padding-x-10px">
        {{ resolveOption(init).groupLabel }}
      </p>
      <div
        :class = "[
          {'coc-option-prescoped': prescoped},
          {'coc-padding-x-20px': resolveOption(init).inGroup},
        ]"
        class = "pointer coc-padding-x-10px coc-padding-y-7px animated fadeIn"
        @mouseover = "handleMouseOver"
        @mouseleave = "handleMouseLeave"
        @click = "handleMouseClick">
        <span :class = "[resolveOption(init).icon ]"/>
        <span class = "coc-padding-x-5px">{{ resolveOption(init).label }}</span>
        <span class="coc-padding-x-5px">
          <small
            v-if = "resolveOption(init).comment"
            :class = "['coc-padding-x-5px', $coc.GetAlignment($root.$coc).inverse]">
            {{ resolveOption(init).comment }}
          </small>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CocOption',
  props: {
    init: {
      type: [Object, String],
      default: 'foo'
    }
  },
  data() {
    return {
      onHover: false
    }
  },
  computed: {
    fallbackIcon() {
      return this.$parent && this.$parent._isVue && this.$parent.icon
        ? this.$parent.icon
        : null
    },
    onFocus() {
      return (
        this.$parent &&
        this.$parent._isVue &&
        this.$parent.focusUid === this._uid
      )
    },
    prescoped() {
      return this.onHover || this.onFocus
    }
  },
  watch: {
    prescoped(val) {
      if (val) {
        this.parentEmit('optionprescoped', this.resolveOption(this.init).value)
      }
    }
  },
  mounted() {
    this.$parent.$on('mousehidden', () => {
      this.onHover = false
    })
  },
  methods: {
    parentEmit(event, payload = null) {
      this.$parent.$emit(event, payload)
    },
    resolveOption(feed) {
      if (feed == null) {
        return {
          value: null,
          label: '',
          icon: this.fallbackIcon,
          comment: null,
          groupLabel: null,
          inGroup: false,
          isFirstInGroup: false,
          isLastInGroup: false
        }
      }
      if (typeof feed == 'object') {
        return {
          groupLabel: feed.groupLabel,
          inGroup: feed.inGroup,
          isFirstInGroup: feed.isFirstInGroup,
          isLastInGroup: feed.isLastInGroup,
          value:
            feed.value !== undefined ? feed.value : feed[Object.keys(feed)[0]],
          label:
            feed.label !== undefined ? feed.label : feed[Object.keys(feed)[0]],
          icon: feed.icon !== undefined ? feed.icon : this.fallbackIcon,
          comment: feed.comment !== undefined ? feed.comment : null
        }
      } else
        return {
          value: feed,
          label: feed,
          icon: this.fallbackIcon,
          comment: null,
          groupLabel: null,
          inGroup: false,
          isFirstInGroup: false,
          isLastInGroup: false
        }
    },
    handleMouseOver() {
      this.onHover = true
      this.parentEmit('optionmousefocus', this._uid)
    },
    handleMouseLeave() {
      this.onHover = false
      this.parentEmit('optionmouseblur')
    },
    handleMouseClick() {
      this.parentEmit('optionpicked', this.resolveOption(this.init).value)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
