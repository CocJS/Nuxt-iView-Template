<template>
  <coc-main-master>
    <div class="container">
      <div class="row coc-margin-top-3rem">
        <div class = "coc-text-content coc-background-bg coc-standard-border-radius coc-padding-y-10px coc-padding-x-5px coc-border-1 coc-border-border">
          <h3 class="text-title">
            Coc Show Keys
          </h3>
          <coc-show-keys>
            <div :slot = "1">
              <div class="row">ONE</div>
            </div>
            <div :slot = "2">
              <div class="row">ONE</div>
            </div>
            <div :slot = "3">
              <div class="row">ONE</div>
            </div>
            <div :slot = "4">
              <div class="row">ONE</div>
            </div>
          </coc-show-keys>
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
      radio: null,
      input: null,
      select: null,
      cb: null,
      btn: null,
      datePicker: null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
