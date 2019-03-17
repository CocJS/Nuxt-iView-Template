<template>
  <coc-main-master>
    <div class="container coc-margin-top-1rem">
      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border"
      >
        <h3 class="text-title coc-content-text">Register</h3>
        <coc-input
          v-model = "input.name"
          :scope = "['register']"
          :rules = "{
            HasValue: { active: true },
            MinLength: { args: 3 },
            MaxLength: { args: 20 }
          }"
          icon = "ios-person-outline"
          size = "large"
          placeholder = "Full Name"/>
        <coc-input
          v-model = "input.username"
          :scope = "['register']"
          :rules = "{
            HasValue: { active: true },
            MinLength: { args: 3 },
            MaxLength: { args: 10 },
            Remote: { 
              args : {
                options: { url : 'https://jsonplaceholder.typicode.com/users', method: 'get' },
                callback: (res, val) => res.data.findIndex(u => u.username === val) === -1
              },
              message: { message : 'This user already exists.', icon: 'ivu-icon ivu-icon-ios-remove-circle' }
            }
          }"
          size = "large"
          icon = "ios-mail-outline"
          placeholder = "Username"/>
        <coc-input
          v-model = "input.password"
          :scope = "['register']"
          :rules = "{
            HasValue: { active: true },
            MinLength: { args: 8 },
            PreConditions: { args: [ nameExists, includesName ], message : 'Whoops!, |*args*|' }
          }"
          size = "large"
          icon = "ios-lock-outline"
          type = "password"
          placeholder = "Password"/>
        <Progress 
          v-bind = "passwordStrength"
          :stroke-width = "20"
          class = "coc-margin-bottom-10px"
          hide-info />
        <coc-button
          v-model = "button"
          :scope = "['register']"
          placeholder = "Login"
          size = "large"
          long
          local/>
        <div
          v-if = "button && button.meta && button.meta.errorStack && button.meta.errorStack.length"
          class = "coc-error-tint-9-bg coc-padding-10px coc-margin-top-10px coc-error-text coc-standard-border-radius coc-border-1 coc-error-border animated fadeIn">
          <p class="text-subtitle coc-error-text">
            <Icon type = "ios-alert-outline"/> 
            Errors {{ button.meta.errorStack.length }}
          </p>
          <p
            v-for = "(error, index) in button.meta.errorStack"
            :key = "index"
            class="text-body coc-error-text">
            <span :class = "error.description.icon"/>
            {{ error.component.placeholder }}:
            {{ error.description.message }}
            <Badge 
              :text="`#${error.description.code}`" 
              type="error"/>
          </p>
        </div>
      </div>
    </div>
  </coc-main-master>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      input: {
        name: { val: '' },
        username: { val: '' },
        password: { val: '' }
      },
      button: { meta: { errorStack: [] } }
    }
  },
  computed: {
    passwordStrength() {
      let percent = 1
      let status = 'wrong'
      if (!this.input.password || !this.input.password.val) {
        percent = 1
        status = 'wrong'
      } else if (
        this.input.password.meta &&
        this.input.password.meta.validationData.code === 17
      ) {
        percent = 33
        status = null
      } else if (
        this.input.password.meta &&
        this.input.password.meta.validationData.code === 23
      ) {
        percent = 66
        status = null
      } else if (this.input.password.meta && this.input.password.meta.valid) {
        percent = 100
        status = null
      }
      return {
        percent,
        status
      }
    }
  },
  methods: {
    nameExists() {
      return (
        (this.input.name.val && this.input.name.meta.valid) ||
        'You must complete your Full Name First'
      )
    },
    includesName(val) {
      return (
        (this.input.name.val &&
          this.input.name.val.length &&
          !val.toLowerCase().includes(this.input.name.val.toLowerCase())) ||
        'Your password cant include your name.'
      )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
