<template>
  <div :id = "containerId">
    <!--Retrievers-->
    <coc-axios
      v-if = "live"
      :url = "fill_from"
      :xdata = "fill_xdata"
      v-model = "remoteFeedsRetriever"
      @success = "handleRemoteFeeds($event)"/>
    <coc-axios
      v-if = "autocomplete"
      :url = "autocomplete_from"
      :xdata = "{ q : input }"
      v-model = "autocompleteRetriever"
      prevent_on_mount
      @success = "handleAutoComplete($event)"/>
    <coc-axios
      v-if = "remote_check"
      :url = "remote_check.url"
      :xdata = "{ q : input }"
      v-model = "remoteCheckRetriever"
      prevent_on_mount
      @success = "handleRemoteCheck($event)"/>
    <!--Retrievers-->
    <Select
      :placeholder="placeholder"
      :id = "componentId"
      :filterable ="filterable"
      :allow-create = "allowcreate"
      :default-first-option = "default_first"
      :prefix-icon = "iconClass.prefix"
      :multiple = "multiple"
      :suffix-icon = "iconClass.suffix"
      :clearable = "!unclearable"
      :disabled="disabled"
      :size = "size"
      v-model="input"
      :class = "[poperClass]"
      style = "width : 100%"
      @focus = "innerEmit(`focus`); isFocused = true"
      @blur = "innerEmit(`blur`); isFocused = false"
      @clear = "innerEmit(`clear`)"
      @input = "construct({ remote : true , value : $event })">
      <div
        slot = "prefix"
        :style="'margin: '+ iconSize +'% 0% 0% 0%;font-size: 120%;'">
        <span :class = "iconClass.prefix"/>
      </div>
      <template
        v-for = "(feed , index) in feeds.get"
        :name= "'option' + index">
        <!-- eslint-disable-next-line -->
      <OptionGroup
          v-if = "hashOption(feed).group"
          :label = "hashOption(feed).label">
          <Option
            v-for = "(child , i) in feed.options"
            :key = "i"
            :value = "hashOption(child).value"
            :label = "hashOption(child).label">
            <span>
              <span :class = "[ icon_align , '' , hashOption(child).icon ]"/>
              <span class = "coc_px_side_padding">{{ hashOption(child).label }}</span>
              <span v-if = "hashOption(child).comment">
                <small
                  :class = "[inverseAlign , 'blue-grey-text coc_px_side_padding text-lighten-1']"
                  style = " padding-right:  15px;">{{ hashOption(child).comment }}</small>
              </span>
            </span>
          </Option>
        </OptionGroup>
        <Option
          v-else
          :key = "index"
          :value = "hashOption(feed).value"
          :label = "hashOption(feed).label">
          <span>
            <span :class = "[ icon_align , 'margin-10px' ,hashOption(feed).icon ]"/>
            <span class = "coc_px_side_padding">{{ hashOption(feed).label }}</span>
            <span class="coc_px_side_padding"><small
              v-if = "hashOption(feed).comment"
              :class = "[inverseAlign , 'coc_px_side_padding blue-grey-text text-lighten-1']">{{ hashOption(feed).comment }}</small></span>
          </span>
        </Option>
      </template>
    </Select>
    <ul
      v-if = "!isValid && isFired && !hide_errors"
      class = "row coc_validation_menu">
      <li
        v-for = "err in validationErrors"
        :class = "[ status_classes.errmenu ]"
        :key = "err">
        <span :class = "errorsBus[err].icon"/>
        <span>{{ errorsBus[err].msg }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CocSelect',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'el-icon-edit'
    },
    light: {
      type: Boolean,
      default: false
    },
    scope: {
      type: Array,
      default: null
    },
    autocomplete: {
      type: Boolean,
      default: false
    },
    autocomplete_from: {
      type: String,
      default: ''
    },
    unclearable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    maxlen: {
      type: Number,
      default: null
    },
    minlen: {
      type: Number,
      default: null
    },
    same_as: {
      type: String,
      default: null
    },
    regex: {
      type: String,
      default: null
    },
    remote_check: {
      type: Object,
      default: null
    },
    status_classes: {
      type: Object,
      default: () => {
        return {
          success: 'green-text',
          error: 'red-text',
          errmenu: 'red-text'
        }
      }
    },
    start_as: {
      type: String,
      default: null
    },
    mixins: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hide_errors: {
      type: Boolean,
      default: false
    },
    input_status_classes: {
      type: Object,
      default: () => {
        return {
          success: 'coc-input-success',
          error: 'coc-input-error',
          focus: 'coc_input_focus',
          regular: 'coc-input-regular',
          init: 'coc-input-init'
        }
      }
    },
    input_status_classes_mixins: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //Selector Props
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    fill_from: {
      type: String,
      default: null
    },
    live: {
      type: Boolean,
      default: false
    },
    fill_xdata: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    allowcreate: {
      type: Boolean,
      default: false
    },
    default_first: {
      type: Boolean,
      default: false
    },
    min_picks: {
      type: Number,
      default: null
    },
    max_picks: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      input: null,
      autocompleteRetriever: { loading: false },
      remoteFeedsRetriever: { loading: false },
      remoteCheckRetriever: { loading: false },
      autocompleteResults: [],
      remoteCheckValidation: false,
      isValid: false,
      isFired: false,
      validationErrors: [],
      submits: 0,
      isFocused: false,
      icon_align: 'left',
      feeds: new this.$coc.Arrays([]), // eslint-disable-line
      remoteFeeds: [],
      pushedFeeds: [],
      onCopy: false
    }
  },
  computed: {
    logger() {
      return new this.$coc.Logger('Coc Radio')
    },
    eventController() {
      return new this.$coc.FormController({
        api: $nuxt,
        type: 'select',
        scope: this.scope,
        model: this.model,
        component: {
          placeholder: this.placeholder,
          domId: this.componentId,
          type: `Select > ${this.multiple ? 'Single' : 'Multiple'}`,
          val: this.input
        }
      })
    },
    iconClass() {
      let str = 'coc_input_icon '
      let result = { suffix: '', prefix: '' }
      str = this.isLoading ? 'el-icon-loading ' : this.icon + ' '
      str =
        this.isFired && this.isValid
          ? str + this.status_classes.success + ' '
          : str
      str =
        this.isFired && !this.isValid
          ? str + this.status_classes.error + ' '
          : str
      result.suffix = this.icon_align == 'right' ? str : ''
      result.prefix = this.icon_align != 'right' ? str : ''
      return result
    },
    poperClass() {
      if (!this.inputStatusMixins) return ''
      if (!this.isFired) {
        if (this.isFocused) {
          return this.inputStatusMixins.focus
        } else {
          return this.inputStatusMixins.regular
        }
      } else if (this.isValid) {
        return this.inputStatusMixins.success
      } else {
        return this.inputStatusMixins.error
      }
    },
    componentId() {
      return 'coc_elinput_' + this._uid
    },
    componentIdHidden() {
      return 'coc_elinput_hidden_' + this._uid
    },
    containerId() {
      return 'coc_elinput_container_' + this._uid
    },
    containerJQueryId() {
      return 'coc_elinput_container_' + this._uid
    },
    jQueryComponentId() {
      return '#coc_elinput_' + this._uid
    },
    validationsOptions() {
      return {
        val: this.input,
        options: [
          {
            name: 'HasValue',
            variable: false,
            pre: this.required,
            credentials: null
          },
          {
            name: 'InMaxRange',
            variable: false,
            pre: this.maxlen,
            credentials: this.maxlen
          },
          {
            name: 'InMinRange',
            variable: false,
            pre: this.minlen,
            credentials: this.minlen
          },
          {
            name: 'SameAs',
            variable: false,
            pre: this.same_as,
            credentials: this.same_as
          },
          {
            name: 'MatchsRegex',
            variable: false,
            pre: this.regex,
            credentials: this.regex
          },
          {
            name: 'Remote',
            variable: true,
            pre: this.remote_check,
            credentials: null
          },
          {
            name: 'MinPicks',
            variable: false,
            pre: this.min_picks && this.multiple,
            credentials: this.min_picks
          },
          {
            name: 'MaxPicks',
            variable: false,
            pre: this.max_picks && this.multiple,
            credentials: this.max_picks
          }
        ]
      }
    },
    errorsBus() {
      let init = {
        HasValue: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'This field is required.'
        },
        InMaxRange: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg:
            'The maximum length for your value must be less than' + this.maxlen
        },
        InMinRange: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg:
            'The minimum length for your value must be greater than' +
            this.minlen
        },
        SameAs: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'This value must be the similar as the confirmed field.'
        },
        MatchsRegex: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'This field`s formula is not correct.'
        },
        Remote: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'This value is unavailable.'
        },
        MinPicks: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'You need to pick at least ' + this.min_picks + ' option/s.'
        },
        MaxPicks: {
          icon: 'el-icon-warning coc_px_side_padding',
          msg: 'You need to pick maximum ' + this.max_picks + ' option/s.'
        }
      }
      if (this.mixins) {
        let k
        for (k in this.mixins) {
          if (init[k] !== undefined) {
            if (this.mixins[k].msg !== undefined)
              init[k].msg = this.mixins[k].msg
            if (this.mixins[k].icon !== undefined)
              init[k].icon = this.mixins[k].icon
          }
        }
      }
      return init
    },
    isLoading() {
      return (
        this.autocompleteRetriever.loading || this.remoteCheckRetriever.loading
      )
    },
    inputStatusMixins() {
      return new this.$coc.Objects(this.input_status_classes).Mix( // eslint-disable-line
        this.input_status_classes_mixins
      ).get
    },
    iconSize() {
      return this.size ? 40 : 60
    },
    inverseAlign() {
      return this.icon_align == 'left' ? 'right' : 'left'
    },
    model() {
      return this.light
        ? this.input
        : {
            val: this.input,
            control: {
              update: this.update,
              clear: this.clear,
              validate: this.validate,
              focus: this.focus,
              meta: this.meta,
              reset: this.reset,
              submit: this.submit,
              refill: this.refill,
              selectAll: this.selectAll,
              push: this.push
            },
            meta: {
              fired: this.isFired,
              valid: this.isValid,
              errors: this.validationErrors,
              autocomplete: this.autocompleteResults,
              domId: this.componentId,
              focused: this.isFocused,
              containerId: this.containerId
            }
          }
    }
  },
  mounted() {
    const vm = this
    this.initFeeds()
    //VUE EVENTS
    //Global Events <<$nuxt API>
    this.eventController.Start()
    //Construct
    this.construct({ remote: false, value: null, validate: false })
    if (this.start_as) this.update(this.start_as)
  },
  methods: {
    realign() {
      // if(this.multiple) return
      // if($nuxt.$coc.HasValue(this.input)) // eslint-disable-line
      // new this.$coc.$('#'+this.componentId).css({ 'text-align' : $nuxt.$coc.TextAlignWeight(this.input).max , 'font-family' : $nuxt.$coc.FontsAlignment[$nuxt.$coc.TextAlignWeight( // eslint-disable-linethis.input).max] })
      //   else new this.$coc.$('#'+this.componentId).css({ 'text-align' : $nuxt.$coc.LangAlignment  ,  'font-family' : $nuxt.$coc.FontsAlignment[$nuxt.$coc.LangAlignment] }) // eslint-disable-line
    },
    selectAll() {
      if (this.multiple) {
        let i,
          temp = []
        let opt = this.feeds.get
        for (i = 0; i < opt.length; i++)
          temp.push(this.hashOption(opt[i]).value)
        this.input = temp
        this.construct({ remote: true, value: temp, validate: true })
      }
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    construct(options) {
      if (options.validate === undefined || options.validate == true)
        this.isFired = true
      //Text Alignment
      this.realign()
      //Remote Check
      this.remoteCheckValidation = false
      if (
        (options.remote === undefined || options.remote == true) &&
        this.remote_check &&
        this.remoteCheckRetriever.retrieve
      )
        if ($nuxt.$coc.HasValue(this.remote_check.url)) // eslint-disable-line
          this.remoteCheckRetriever.retrieve()
        else
          this.logger.Warn(
            'You turned on remote_check option, but you did not set *url* to the prop.'
          )
      //AutoComplete
      if (this.autocomplete && this.autocompleteRetriever.retrieve)
        if ($nuxt.$coc.HasValue(this.autocomplete_from) && this.autocomplete) // eslint-disable-line
          this.autocompleteRetriever.retrieve()
        else
          this.logger.Warn(
            'You turned on autocomplete option, but you didn not set `autocomplete_from` prop.'
          )
      //Validations
      if (options.validate === undefined || options.validate == true)
        this.validate()
      this.emit()
    },
    update() {
      this.input = arguments[0]
      this.construct({ remote: true, value: arguments[0] })
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    initFeeds() {
      this.feeds
        .Clear()
        .Merge(this.options)
        .Merge(this.remoteFeeds)
        .Merge(this.pushedFeeds)
      this.reset()
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    refill() {
      if (
        !this.live ||
        !this.remoteFeedsRetriever ||
        !typeof this.remoteFeedsRetriever.retrieve === 'function'
      ) {
        this.logger.Warn('You cant refill a non live component.')
        return
      }
      this.remoteFeedsRetriever.retrieve()
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    push() {
      this.pushedFeeds.push(arguments[0])
      this.initFeeds()
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    clear() {
      this.input = ''
      this.construct({ remote: true, value: '' })
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    focus() {
      new this.$coc.$(this.jQueryComponentId).Focus(); // eslint-disable-line
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    blur() {
      new this.$coc.$(this.jQueryComponentId).Blur(); // eslint-disable-line
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    select() {
      new this.$coc.$(this.jQueryComponentId).Focus().select(); // eslint-disable-line
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    copy() {
      this.onCopy = true
      if (!$nuxt.$coc.HasValue(this.input)) { // eslint-disable-line
        this.$message({
          showClose: true,
          message: 'There`s no content to be copied in this field.',
          type: 'error'
        })
        this.onCopy = false
        return this.model.control
      }
      let copyText = document.getElementById(this.componentIdHidden)
      copyText.select()
      document.execCommand('copy')
      this.$Message.success({
        showClose: true,
        message: 'Your text was copied.',
        type: 'success'
      })
      this.blur()
      this.onCopy = false
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
      return this.model.control
    },
    watchMyDom() {
      if (!this.inputStatusMixins) return
      if (
        !new this.$coc.$(this.jQueryComponentId).HasClass(this.inputStatusMixins.init) // eslint-disable-line
      )
        new this.$coc.$(this.jQueryComponentId).AddClass(this.inputStatusMixins.init); // eslint-disable-line
      if (!this.isFired) {
        if (this.isFocused) {
          new this.$coc.$(this.jQueryComponentId) // eslint-disable-line
            .RemoveClass(this.inputStatusMixins.regular)
            .RemoveClass(this.inputStatusMixins.success)
            .RemoveClass(this.inputStatusMixins.error)
          new this.$coc.$(this.jQueryComponentId).AddClass( // eslint-disable-line
            this.inputStatusMixins.focus
          )
        } else {
          new this.$coc.$(this.jQueryComponentId) // eslint-disable-line
            .RemoveClass(this.inputStatusMixins.focus)
            .RemoveClass(this.inputStatusMixins.success)
            .RemoveClass(this.inputStatusMixins.error)
          new this.$coc.$(this.jQueryComponentId).AddClass( // eslint-disable-line
            this.inputStatusMixins.regular
          )
        }
      } else if (this.isValid) {
        new this.$coc.$(this.jQueryComponentId) // eslint-disable-line
          .RemoveClass(this.inputStatusMixins.regular)
          .RemoveClass(this.inputStatusMixins.focus)
          .RemoveClass(this.inputStatusMixins.error)
        new this.$coc.$(this.jQueryComponentId).AddClass( // eslint-disable-line
          this.inputStatusMixins.success
        )
      } else {
        new this.$coc.$(this.jQueryComponentId) // eslint-disable-line
          .RemoveClass(this.inputStatusMixins.regular)
          .RemoveClass(this.inputStatusMixins.success)
          .RemoveClass(this.inputStatusMixins.focus)
        new this.$coc.$(this.jQueryComponentId).AddClass( // eslint-disable-line
          this.inputStatusMixins.error
        )
      }
    },
    meta() {
      this.eventController.HandleMeta()
    },
    reset() {
      this.input = this.multiple ? [] : null
      this.construct({ validate: false, remote: false })
      this.isFired = false
      this.validationErrors = []
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    submit() {
      this.eventController.Submit()
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    handleAutoComplete(e) {
      this.autocompleteResults = e.response
      this.$emit('autocomplete', this.autocompleteResults)
    },
    handleRemoteCheck(e) {
      this.remoteCheckValidation =
        this.remoteCheckRetriever.response == this.remote_check.valid
      this.construct({ remote: false, value: this.input })
    },
    handleRemoteFeeds(e) {
      if (typeof e.response == 'object') this.remoteFeeds = e.response
      this.initFeeds()
    },
    validate() {
      this.isValid = true
      let validation = $nuxt.$coc.Validate.Start(this.validationsOptions); // eslint-disable-line
      this.isValid = validation.valid
      this.validationErrors = validation.errors
      if (arguments.length > 0) {
        if (arguments[0] == 'meta') {
          this.isFired = true
          this.meta('valid')
        }
      }
      //Check and Call the aruguments callback
      if (typeof arguments[arguments.length - 1] == 'function') {
        arguments[arguments.length - 1]()
      }
    },
    emit() {
      let event = arguments.length == 0 ? 'input' : arguments[0]
      this.$emit(event, this.model)
      // this.watchMyDom()
    },
    innerEmit(e) {
      this.$emit(e)
    },
    hashOption(feed) {
      if (feed == null) {
        return {
          value: null,
          label: '',
          icon: this.icon,
          comment: null,
          group: false
        }
      }
      if (typeof feed == 'object') {
        return {
          group: feed.group !== undefined && feed.group,
          value:
            feed.value !== undefined ? feed.value : feed[Object.keys(feed)[0]],
          label:
            feed.label !== undefined ? feed.label : feed[Object.keys(feed)[0]],
          icon: feed.icon !== undefined ? feed.icon : this.icon,
          comment: feed.comment !== undefined ? feed.comment : null
        }
      } else
        return {
          value: feed,
          label: feed,
          icon: this.icon,
          comment: null,
          group: false
        }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
