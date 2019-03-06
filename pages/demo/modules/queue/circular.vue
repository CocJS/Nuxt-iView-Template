<template>
  <coc-main-master>
    <div class="container">
      <h3 class = "coc-text-title coc-primary-text text-code">Circular Queue</h3>
      <div class = "row coc-padding-y-3rem">
        <div class="row house-keeper">
          <div
            v-for = "(item, index) in instance.val"
            :key = "index"
            class="col">
            <span
              :class = "[{'coc-border-border coc-background-bg coc-content-text': instance.Cursor !== index}, {'coc-dark-shade-border coc-light-info-bg coc-dark-info-text': instance.Cursor === index}]"
              class = "coc-border-1 coc-text-subtitle coc-tiny-border-radius coc-margin-x-1px col s12">
              <span class = "text-code">
                {{ instance.val[index] }}
              </span>
            </span>
            <Icon
              v-if = "instance.Cursor === index"
              type="md-arrow-dropup"
              class = "coc-primary-text center block coc-text-subtitle coc-margin-y-3px" />
          </div>
        </div>
        <div class="row ">
          <div class="col s12">
            <div class="col s12 coc-section">
              <h1 class="coc-primary-text center text-code">
                Getters
              </h1>
              <Divider/>
              <div class="col s6">
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.Cursor<span class = "coc-text-heading coc-info-text right">{{ instance.Cursor }}</span></code></p>
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.CursorElement <span class = "coc-text-heading coc-info-text right">{{ instance.CursorElement }}</span></code></p>
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.PreviousIndex <span class = "coc-text-heading coc-info-text right">{{ instance.PreviousIndex }}</span></code></p>
              </div>
              <div class="col s5 push-s1">
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.Shifts <span class = "coc-text-heading coc-info-text right">{{ instance.Shifts }}</span></code></p>
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.Rounds <span class = "coc-text-heading coc-info-text right">{{ instance.Rounds }}</span></code></p>
                <p class = "coc-text-subtitle coc-primary-text"><code>instance.NextIndex <span class = "coc-text-heading coc-info-text right">{{ instance.NextIndex }}</span></code></p>
              </div>
            </div>
          </div>
          <div class="col s12">
            <div class="col s12 coc-section">
              <div class="center">
                <Tag color = "geekblue">
                  <code class = "coc-text-normal-2">instance.Back()</code>
                </Tag>
                <Button
                  shape = "circle"
                  type = "error"
                  icon = "ios-arrow-back"
                  @click = "instance.Back()"/>
                <Button
                  shape = "circle"
                  type = "error"
                  icon = "ios-arrow-forward"
                  @click = "instance.Next()
                  "/>
                <Tag color = "geekblue">
                  <code class = "coc-text-normal-2">instance.Next()</code>
                </Tag>
              </div>
            </div>
          </div>
          <div class="col s6">
            <div class="col s12 coc-section">
              <Tag color = "geekblue">
                <code class = "coc-text-normal-2">instance.Move(int moves)</code>
              </Tag>
              <br><br>
              <div class = "right">
                <InputNumber
                  v-model = "numberInput"/>
                <Button
                  type = "info"
                  @click = "instance.Move(numberInput)">Move</Button>
              </div>
            </div>
          </div>
          <div class="col s6">
            <div class="col s12 coc-section">
              <Tag color = "geekblue">
                <code class = "coc-text-normal-2">instance.SetCursor(int moves, boolean reset = false)</code>
              </Tag>
              <br><br>
              <Tag color = "geekblue">
                <code class = "coc-text-normal-2">SetCursor({{ setCursorInput }}, {{ setCursorReset ? 'true' : 'false' }})</code>
              </Tag>
              <div class = "right">
                <Checkbox v-model = "setCursorReset">Reset</Checkbox>
                <InputNumber
                  v-model = "setCursorInput"/>
                <Button
                  type = "info"
                  @click = "instance.SetCursor(setCursorInput, setCursorReset)">Set</Button>
              </div>
            </div>
          </div>
          <!--Get Cursor After-->
          <div class="col s6">
            <div class="col s12 coc-section">
              <Tag color = "geekblue">
                <code class = "coc-text-normal-2">instance.GetCursorAfter(int moves)</code>
              </Tag>
              <div class = "right">
                <InputNumber
                  v-model = "getCursorAfter"/>
              </div>
              <Divider class = "full-width"/>
              <p class = "text-code coc-info-text coc-text-subtitle center"><code>{{ instance.GetCursorAfter(getCursorAfter) }}</code></p>
            </div>
          </div>
          <!--Get Rounds After-->
          <div class="col s6">
            <div class="col s12 coc-section">
              <Tag color = "geekblue">
                <code class = "coc-text-normal-2">instance.GetRoundsAfter(int moves)</code>
              </Tag>
              <div class = "right">
                <InputNumber
                  v-model = "getRoundsAfter"/>
              </div>
              <Divider class = "full-width"/>
              <p class = "text-code coc-info-text coc-text-subtitle center"><code>{{ instance.GetRoundsAfter(getRoundsAfter) }}</code></p>
            </div>
          </div>
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
      numberInput: 0,
      getRoundsAfter: 0,
      getCursorAfter: 0,
      setCursorInput: 0,
      setCursorReset: false,
      instance: new this.$root.$coc.CircularQueue([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'G'
      ])
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="css" scoped>
</style>
