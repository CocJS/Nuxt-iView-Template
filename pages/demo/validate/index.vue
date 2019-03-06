<template>
  <coc-main-master>
    <div class="container">
      <div>
        <div class="coc-primary-section-outline">
          <h1 class="coc-text-title text-code">
            $coc.Validator
          </h1>
        </div>
        <Alert show-icon>
          <h4 class = "coc-info-text">Usage</h4>
          <Icon 
            slot="icon" 
            type="ios-bulb-outline"/>
          <template slot="desc"><h4 class = "coc-info-text">
            Open Your console and start running the validations<br>
            You can use an instance from this class at <code class = "coc-dark-info-text">$nuxt.$coc.Validator</code> in your console
          </h4></template>
        </Alert>
        <div class="col s12">
          <pre class = "coc-carbon-bg coc-warning-text coc-standard-border-radius coc-border-1 coc-dark-warning-border coc-margin-y-1rem coc-padding-x-10px text-smd">
      <code>
    const vm = $nuxt

    // New instance from Validator class
    this.instance = new vm.$coc.Validator('2012-01-01')

    // Custom Validator functions
    const funOne = val => val === '2012-01-01'
    const funTwo = val => typeof val === 'string'

    // Custom Validators Group
    const PreConditionsArgs = [funOne, funTwo]

    // Rule validator as an option
    const PreConditions = { args: PreConditionsArgs }

    // Invalid Validator
    // Coc Validator must warn you about this in your console if in dev mode
    const InvalidOne = { foo: 'bar' }

    // Date Vlidations

    // Is Date data type or valid date string
    const IsDateString = { active: true }

    // Min date
    const MinDate = { args: vm.$moment('2011-01-01') }

    // Max Length
    const InMaxRange = { args: 5 }

    // Promise Validation
    const GetPromise = async () => {
      return new Promise((resolve, reject) => {
        vm.$axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then(res => {
            if (!res.data[0]) {
              resolve(true)
            } else {
              reject(false)
            }
          })
          .catch(() => {
            reject(false)
          })
      })
    }

    // Promise as an option
    const ResolvedPromise = {
      active: true,
      args: GetPromise
    }

    // Options Creation
    const options = {
      PreConditions,
      InvalidOne,
      IsDateString,
      MinDate,
      ResolvedPromise,
      InMaxRange
    }

    instance.SetOptions(options)

    const run = () => {
      // Validate
      instance
        .Run()
        .then(data => {
          console.log('Success', data)
        })
        .catch(err => {
          console.log('Failed with ', err)
        })
    }
      </code>
          </pre>
        </div>
        <Button 
          class = "full-width"
          icon = "ios-bug" 
          size = "large"
          @click = "run">Run</Button>
        <pre class = "coc-light-info-bg coc-dark-info-text coc-standard-border-radius coc-border-1 coc-dark-info-border coc-margin-y-1rem coc-padding-x-10px">
      <code>
        {{ instance }}
      </code>
        </pre>
      </div>
    </div>
  </coc-main-master>
</template>

<script>
export default {
  name: 'Index',

  data() {
    return {
      instance: null
    }
  },
  mounted() {
    const vm = this
    this.instance = new this.$coc.Validator('2012-01-01')
    // Custom Validator
    const fun = val => val === '2012-01-01'
    // Custom Validators Group
    const PreConditionsArgs = [fun]
    const PreConditions = { args: PreConditionsArgs }

    // Invalid Validator
    const InvalidOne = { foo: 'bar' }

    // Invalid Date Validator
    const IsDateString = { active: true }
    const MinDate = { args: this.$moment('2011-01-01') }
    const InMaxRange = { args: 5 }
    const GetPromise = async () => {
      return new Promise((resolve, reject) => {
        this.$axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then(res => {
            if (!res.data[0]) {
              resolve(true)
            } else {
              reject(false)
            }
          })
          .catch(() => {
            reject(false)
          })
      })
    }
    const ResolvedPromise = {
      active: true,
      args: GetPromise
    }

    // Options Creation
    const options = {
      PreConditions,
      InvalidOne,
      IsDateString,
      MinDate,
      ResolvedPromise,
      InMaxRange
    }
    this.instance.SetOptions(options)
  },
  methods: {
    run() {
      // Validate
      this.instance
        .Run()
        .then(data => {
          console.log('Success', data)
        })
        .catch(err => {
          console.log('Failed with ', err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
