<template>
  <coc-main-master>
    <div class="container coc-margin-top-1rem">
      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border"
      >
        <h3 class="text-title coc-content-text">Form</h3>
        <coc-form
          :fields="[
            {
              step: 'Step One',
              content: 'Your name',
              fields: [
                {
                  type: 'input',
                  ref: 'fname',
                  props: {
                    placeholder: 'First name',
                    required: true,
                  }
                },
                {
                  type: 'input',
                  ref: 'lname',
                  props: {
                    placeholder: 'Last name',
                  }
                },
                {
                  type: 'select',
                  ref: 'gender',
                  props: {
                    placeholder: 'Gender',
                    multiple: true,
                    options: [
                      'Male',
                      'Female',
                      {
                        group: true,
                        label: 'Others',
                        options: [
                          { value: 'transgender', label : 'Transgender', icon: 'ivu-icon ivu-icon-ios-person' },
                        ]
                      }
                    ]
                  }
                },
                {
                  type: 'button',
                  ref: 'submit',
                  bind: { class: 'col s12' },
                  props: {
                    placeholder: 'Submit',
                    local: true,
                    classes: 'full-width'
                  }
                }
              ]
            }
          ]"
        />
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Pure Input</h3>
        <coc-pure-input
          v-model="cocPureInput"
          :autocomplete-feeds="dropdownOptions"
          :rules="{
            HasValue: { active: true },
            MaxLength: { active: true, args: 6 }
          }"
          :autocomplete-remote="(model) => { return { method: 'get', url: 'https://jsonplaceholder.typicode.com/posts', free_origin: true } }"
          :autocomplete-map-response="(res, val) => { return res.map( item => { return { label : item.title, value: item.id.toString() } } ) }"
          icon = "ivu-icon ivu-icon-ios-person"
          allow-autocomplete
          @coc-focus="handleEvent"
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="cocPureInput">
          <Button
            v-for="(method, index) in cocPureInput.control"
            :key="index"
            class="text-code"
            @click="cocPureInput.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Pure Select</h3>
        <coc-pure-select
          v-model="cocPureSelect"
          :autocomplete-feeds="dropdownOptions"
          :rules="{
            HasValue: { active: true },
            MaxLength: { active: true, args: 6 }
          }"
          :autocomplete-remote="(model) => { return { method: 'get', url: 'https://jsonplaceholder.typicode.com/posts', free_origin: true } }"
          :autocomplete-map-response="(res, val) => { return res.map( item => { return { label : item.title, value: item.id.toString() } } ) }"
          placeholder = "foo"
          allow-autocomplete
          multiple
          @coc-focus = "handleEvent"
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="cocPureInput">
          <Button
            v-for="(method, index) in cocPureInput.control"
            :key="index"
            class="text-code"
            @click="cocPureInput.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Input</h3>
        <coc-input
          v-model="input"
          :maxlen="12"
          :minlen="3"
          :scope="['form']"
          placeholder="COC Input"
          icon="ios-person"
          type="password"
          required
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="input">
          <Button
            v-for="(method, index) in input.control"
            :key="index"
            class="text-code"
            @click="input.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Select</h3>
        <coc-select
          v-model="select"
          :options="[
            {
              label: 'Web',
              group: true,
              options: [
                { label: 'HTML', value: 'html', icon: 'ivu-icon ivu-icon-logo-html5 orange-text' },
                { label: 'JavaScript', value: 'js', icon: 'ivu-icon ivu-icon-logo-javascript yellow-text' },
                { label: 'CSS', value: 'css', icon: 'ivu-icon ivu-icon-logo-css3 blue-text' },
              ]
            },
            {
              label: 'Mobile',
              group: true,
              options: [
                { label: 'IOS', value: 'ios', icon: 'ivu-icon ivu-icon-ios-appstore blue-text text-darken-3' },
                { label: 'Andriod', value: 'andriod', icon: 'ivu-icon ivu-icon-logo-android green-text' },
              ]
            }
          ]"
          :scope="['form']"
          :max_picks="4"
          :min_picks="2"
          placeholder="COC Select, Select a programming flavour"
          icon="ios-code"
          required
          multiple
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="select">
          <Button
            v-for="(method, index) in select.control"
            :key="index"
            class="text-code"
            @click="select.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Radio</h3>
        <coc-radio
          v-model="radio"
          :options="[

            { label: 'HTML', value: 'html', icon: 'ivu-icon ivu-icon-logo-html5 orange-text' },
            { label: 'JavaScript', value: 'js', icon: 'ivu-icon ivu-icon-logo-javascript yellow-text' },
            { label: 'CSS', value: 'css', icon: 'ivu-icon ivu-icon-logo-css3 blue-text' },
            { label: 'IOS', value: 'ios', icon: 'ivu-icon ivu-icon-ios-appstore blue-text text-darken-3' },
            { label: 'Andriod', value: 'andriod', icon: 'ivu-icon ivu-icon-logo-android green-text' },
          ]"
          :scope="['form']"
          placeholder="COC Select, Select a programming flavour"
          icon="ios-code"
          required
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="radio">
          <Button
            v-for="(method, index) in radio.control"
            :key="index"
            class="text-code"
            @click="radio.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Checkbox</h3>
        <coc-radio
          v-model="cb"
          :options="[

            { label: 'HTML', value: 'html', icon: 'ivu-icon ivu-icon-logo-html5 orange-text' },
            { label: 'JavaScript', value: 'js', icon: 'ivu-icon ivu-icon-logo-javascript yellow-text' },
            { label: 'CSS', value: 'css', icon: 'ivu-icon ivu-icon-logo-css3 blue-text' },
            { label: 'IOS', value: 'ios', icon: 'ivu-icon ivu-icon-ios-appstore blue-text text-darken-3' },
            { label: 'Andriod', value: 'andriod', icon: 'ivu-icon ivu-icon-logo-android green-text' },
          ]"
          :scope="['form']"
          :max_picks="4"
          :min_picks="2"
          placeholder="COC Select, Select a programming flavour"
          icon="ios-code"
          required
          multiple
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="cb">
          <Button
            v-for="(method, index) in cb.control"
            :key="index"
            class="text-code"
            @click="cb.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Button</h3>
        <coc-button
          v-model="btn"
          :bind="{ long: true }"
          :scope="['form']"
          :before-submit="beforeSubmit"
          classes="text-mg-lg text-thin"
          placeholder="Submit Coc Button"
          size="large"
          circle
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="btn">
          <Button
            v-for="(method, index) in btn.control"
            :key="index"
            class="text-code"
            @click="btn.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>

      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Date Picker</h3>
        <coc-date
          :scope="['form']"
          :bind="{
            icon: 'ios-person',
            placeholder: 'Works Since',
          }"
          :min="{ date : '1995-06-15', margin: { unit : 'y' , count: 3 } }"
          :max="{ date : '1995-06-15', margin: { unit : 'y' , count: 20 } }"
          v-model="datePicker"
          required
        />
        <p class="text-subtitle coc-content-text text-code">Controls</p>
        <ButtonGroup v-if="datePicker">
          <Button
            v-for="(method, index) in datePicker.control"
            :key="index"
            class="text-code"
            @click="datePicker.control[index]()"
          >{{ index }}</Button>
        </ButtonGroup>
      </div>
      <div
        v-coc-loading="loaderDirective"
        coc-loader-hastext="false"
        class="coc-margin-top-5rem col s12 coc-background-bg coc-padding-10px coc-margin-y-10px text-smd text-code coc-border-border coc-border-1 coc-standard-border-radius"
      >
        <h3
          class="coc-primary-text text-subtitle text-code"
        >v-coc-loading = "{{ loaderDirective ? 'true' : 'false' }}"</h3>
        <h3 class="coc-primary-text text-subtitle text-code">coc-loader-hastext = "false"</h3>
        <p
          class="coc-primary-text"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet volutpat consequat mauris. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Dolor sed viverra ipsum nunc aliquet bibendum. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Urna duis convallis convallis tellus id interdum velit laoreet id. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Dictumst quisque sagittis purus sit amet. Imperdiet dui accumsan sit amet. Cras tincidunt lobortis feugiat vivamus. Amet cursus sit amet dictum. Orci sagittis eu volutpat odio facilisis mauris. Purus ut faucibus pulvinar elementum integer. Sit amet aliquam id diam maecenas ultricies. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Auctor augue mauris augue neque gravida in fermentum et. Sem nulla pharetra diam sit amet nisl. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. In tellus integer feugiat scelerisque varius morbi enim nunc. Diam vulputate ut pharetra sit amet aliquam.</p>
      </div>
      <div
        v-coc-loading.ivu-icon.ivu-icon-ios-alert.coc-error-text.text-super="loaderDirective"
        coc-loader-text="Disabled"
        coc-loader-bg="rgba(0,0,0,0.5)"
        coc-loader-classes="coc-error-text block text-super text-sans-serif text-thin"
        class="coc-margin-top-5rem col s12 coc-background-bg coc-padding-10px coc-margin-y-10px text-smd text-code coc-border-border coc-border-1 coc-standard-border-radius"
      >
        <h3
          class="coc-primary-text text-code"
        >v-coc-loading.ivu-icon.ivu-icon-ios-alert.coc-error-text.text-super = "{{ loaderDirective ? 'true' : 'false' }}"</h3>
        <h3 class="coc-primary-text text-code">coc-loader-text = "Disabled"</h3>
        <h3 class="coc-primary-text text-code">coc-loader-bg = "rgba(0,0,0,0.5)"</h3>
        <h3
          class="coc-primary-text text-code"
        >coc-loader-classes = "coc-error-text block text-super text-sans-serif text-thin"</h3>
        <p
          class="coc-primary-text"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quisque sagittis purus sit amet volutpat consequat mauris. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Dolor sed viverra ipsum nunc aliquet bibendum. Aliquam vestibulum morbi blandit cursus risus at ultrices mi. Urna duis convallis convallis tellus id interdum velit laoreet id. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Dictumst quisque sagittis purus sit amet. Imperdiet dui accumsan sit amet. Cras tincidunt lobortis feugiat vivamus. Amet cursus sit amet dictum. Orci sagittis eu volutpat odio facilisis mauris. Purus ut faucibus pulvinar elementum integer. Sit amet aliquam id diam maecenas ultricies. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Auctor augue mauris augue neque gravida in fermentum et. Sem nulla pharetra diam sit amet nisl. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. In tellus integer feugiat scelerisque varius morbi enim nunc. Diam vulputate ut pharetra sit amet aliquam.</p>
      </div>
      <div
        v-coc-mouse-over="`pulse`"
        v-coc-mouse-leave="`rotateIn`"
        v-coc-mouse-down="`jello`"
        v-coc-mouse-up="`rubberBand`"
        class="coc-margin-top-5rem animated col s12 coc-background-bg coc-padding-10px coc-margin-y-10px text-smd text-code coc-border-border coc-border-1 coc-standard-border-radius"
      >
        <h3 class="coc-primary-text text-subtitle text-code">v-coc-mouse-over = "'bounceUp'"</h3>
        <h3 class="coc-primary-text text-subtitle text-code">v-coc-mouse-leave = "'swing'"</h3>
        <h3 class="coc-primary-text text-subtitle text-code">v-coc-mouse-down = "'tada'"</h3>
        <h3 class="coc-primary-text text-subtitle text-code">v-coc-mouse-up = "'wobble'"</h3>
      </div>
      <div
        class="coc-margin-top-5rem col s12 coc-background-bg coc-padding-10px coc-margin-y-10px text-smd text-code coc-border-border coc-border-1 coc-standard-border-radius"
      >
        <h3 class="coc-primary-text text-subtitle text-code">Coc Filters</h3>
        <Alert show-icon>
          <h4 class="coc-info-text">Usage</h4>
          <Icon 
            slot="icon" 
            type="ios-bulb-outline"/>
          <template slot="desc">
            <h4 class="coc-info-text">
              <b class="coc-dark-info-text">Template</b>
              <span>{</span>
              { val | CocMyFilter }
              <span>}</span>
              <br>
              <b class="coc-dark-info-text">Code</b> this.$coc.Filters.MyFilter(val)
            </h4>
          </template>
        </Alert>
        <p class="coc-primary-text">
          <strong>CocToUpperCase</strong> >
          <b>lorem ipsum dolor sit amet</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 'lorem ipsum dolor sit amet' | CocToUpperCase }}</strong>
          <br>
          <strong>CocToLowerCase</strong> >
          <b>loRem IpSum dOlor sIt aMet</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 'loRem IpSum dOlor sIt aMet' | CocToLowerCase }}</strong>
          <br>
          <strong>CocCapitalizeFirst</strong> >
          <b>lorem ipsum dolor sit amet</b>
          <br>
          <strong
            class="coc-dark-primary-text"
          >{{ 'lorem ipsum dolor sit amet' | CocCapitalizeFirst }}</strong>
          <br>
          <strong>CocCapitalizeName</strong> >
          <b>m-amr moussa</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 'm-amr moussa' | CocCapitalizeName }}</strong>
          <br>
          <strong>CocTrimExtraZeros</strong> >
          <b>12.100</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 12.100 | CocTrimExtraZeros }}</strong>
          <br>
          <strong>CocMigaNumber</strong> >
          <b>12300000.100</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 12300000.100 | CocMigaNumber }}</strong>
          <br>
          <strong>CocMigaNumber</strong> >
          <b>12500</b>
          <br>
          <strong class="coc-dark-primary-text">{{ 12500 | CocMigaNumber }}</strong>
          <br>
        </p>
      </div>
      <div
        class="coc-background-bg coc-padding-10px coc-standard-border-radius coc-border-1 coc-border-border coc-margin-y-10px"
      >
        <h3 class="text-title coc-content-text">Coc Tags</h3>
        <coc-tag
          :avatar = "{
            source : $coc.App.logo.primary,
            scale : '15px',
            borderRadius : 'bounced',
            childClasses : ['coc-margin-top-3px coc-padding-0 col'],
            parentClass: ['row coc-inline-block house-keeper']
          }"
          color="primary"
          type="outline"
          border-radius="bounced"
          class="coc-margin-y-3px"
          font-size="small"
        >Hesham
        </coc-tag>
        <coc-tag
          color="success"
          type="dark"
          border-radius="rounded"
          class="coc-margin-y-3px"
          font-size="normal"
        >Hesham</coc-tag>
        <coc-tag
          color="warning"
          type="dark"
          border-radius="tiny"
          class="coc-margin-y-3px"
          font-size="normal-1"
        >Hesham</coc-tag>
        <coc-tag
          color="error"
          type="light"
          border-radius="normal"
          class="coc-margin-y-3px"
          font-size="large"
        >Hesham</coc-tag>
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
      cocPureInput: null,
      cocPureSelect: null,
      select: null,
      cb: null,
      btn: null,
      datePicker: null,
      dropdownOptions: [
        'Foo',
        'Bar',
        {
          group: true,
          label: 'OS',
          icon: 'ivu-icon ivu-icon-logo-buffer orange-text',
          options: [
            {
              label: 'Linux',
              value: 'linux',
              icon: 'ivu-icon ivu-icon-logo-tux coc-content-text'
            },
            {
              label: 'Windows',
              value: 'windows',
              avatar: this.$coc.App.logo.primary,
              avatarOptions: {
                scale: '15px',
                childClasses: [
                  'coc-padding-3px col coc-margin-top-2px coc-primary-background-bg'
                ],
                parentClass: ['row coc-inline-block house-keeper']
              }
            },
            {
              label: 'DOS',
              value: 'dos',
              comment: 'Comment'
            }
          ]
        },
        {
          label: 'HTML',
          value: 'html',
          icon: 'ivu-icon ivu-icon-logo-html5 orange-text'
        },
        {
          label: 'JavaScript',
          value: 'js',
          icon: 'ivu-icon ivu-icon-logo-javascript yellow-text'
        },
        {
          label: 'CSS',
          value: 'css',
          icon: 'ivu-icon ivu-icon-logo-css3 blue-text'
        },
        {
          label: 'IOS',
          value: 'ios',
          icon: 'ivu-icon ivu-icon-ios-appstore blue-text text-darken-3'
        },
        {
          label: 'Andriod',
          value: 'andriod',
          icon: 'ivu-icon ivu-icon-logo-android green-text'
        }
      ],
      loaderDirective: true,
      async beforeSubmit() {
        return new Promise((resolve, reject) => {
          this.$axios
            .get('/')
            .then(() => {
              return resolve(true)
            })
            .catch(() => {
              return reject(false)
            })
        })
      }
    }
  },
  mounted() {
    // setTimeout(() => {
    //   console.log(this.$refs.inputFieldReference)
    // }, 3000)
  },
  methods: {
    handleEvent(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
