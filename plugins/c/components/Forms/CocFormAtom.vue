<template>
  <div v-if = "dev">
    <pre>
    	<code>
    		foo
    	</code>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'CocFormAtom',
  props: {
    scope: {
      type: Array,
      default: null
    },
    cocEventController: {
      type: Object,
      required: true
    },
    val: {
      type: [Object, String, Number, Array],
      default: null
    },
    validate: {
      type: [Object, Array],
      default() {
        return {}
      }
    },
    dev: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    eventController() {
      return new this.$coc.FormController({
        api: this.$root,
        type: this.cocEventController.type,
        scope: this.scope,
        model: this.cocEventController.model,
        component: this.cocEventController.component
      })
    },
    validator() {
      if (!this.validate) {
        return null
      }
      const v = new this.$coc.Validator(this.val)
      v.SetOptions(this.validate)
      return v
    }
  },
  watch: {
    val(val) {
      if (!this.validate) {
        return
      }
      const vm = this
      this.validator
        .Run()
        .then(data => {
          vm.$emit('validation', data)
        })
        .catch(data => {
          vm.$emit('validation', data)
        })
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="css" scoped>
</style>
