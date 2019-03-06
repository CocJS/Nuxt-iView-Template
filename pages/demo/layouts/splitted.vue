<template>
  <CocLayoutMasterSplitted v-model = "layout">
    <div
      slot = "left"
      class = "animated fadeInLeft">
      <div class = "full-height coc-schema-invert coc-full-fixed-height">
        <div class="row">
          <h1 class = "center text-code">Left</h1>
          <p class = "text-code text-md center">
            This content goes under `left` slot
          </p>
          <section class = "coc-margin-top-2rem">
            <p class = "text-code text-md center">
              v-Model <br>
              {{ layout }}
            </p>
          </section>
          <section class = "coc-margin-top-2rem">
            <p class = "text-code text-md center">
              Now, resize your window to see more.
            </p>
          </section>
        </div>
      </div>
    </div>
    <div
      slot = "toggleLeft"
      class = "pointer coc-absolute coc-secondary-text"
      style = "bottom: 10px; left: 10px;">
      Left Side Toggler
    </div>
    <div
      slot = "right"
      class = "animated flipInY coc-schema-primary coc-full-fixed-height">
      <div class="row">
        <h1 class = "center text-code">Right</h1>
        <p class = "text-code text-md center">
          This content goes under `right` slot
        </p>
      </div>
    </div>
    <div
      slot = "toggleRight"
      class = "pointer coc-absolute coc-primary-text"
      style = "bottom: 10px; left: 10px;">
      Right Side Toggler
    </div>
  </CocLayoutMasterSplitted>
</template>

<script>
export default {
  name: 'Splitted',

  data() {
    return {
      layout: null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
