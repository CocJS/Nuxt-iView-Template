<template>
  <div>
    <Input
      v-model = "input"
      placeholder = "Please input.."></Input> <!--eslint-disable-line-->
  </div>
</template>

<script>
export default {
  name: 'Validate',

  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="css" scoped>
</style>
