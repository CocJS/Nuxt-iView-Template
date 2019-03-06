import Event from '../Events'
import COC from '../Core'
import Objects from '../Objects'
import Logger from '../Logger'
export default class FormControl extends Event {
  constructor(event) {
    super(event)
    this.type = event.type
    this.model = event.model
    this.scope = event.scope
    this.component = event.component ? event.component : null
    this.registered = {}
    this.Logger = new Logger(`COC ${this.type} | CEFC`)
    this.val = this.setVal(this)
  }

  Start() {
    this.On('COCFormController', payloads => {
      // Validate if there's a scope
      if (!this.scope) {
        this.Warn('There is no scope in this component.')
        return
      }
      //Type Check
      if (payloads.type !== undefined && payloads.type != this.type) {
        return
      }

      //Check Matching
      if (COC.IsMatchedArrays(this.scope, payloads.scope)) {
        if (this.model.control[payloads.controller] !== undefined) {
          this.model.control[payloads.controller](
            payloads.credentials,
            payloads.callback !== undefined &&
            typeof payloads.callback === 'function'
              ? payloads.callback
              : null
          )
        } else {
          this.Warn(
            `The Controller (${
              payloads.controller
            }) that you are trying to access does not exist.`
          )
        }
      } else return
    })
  }
  Send(options) {
    const defaults = {
      scope: this.scope
    }
    this.Emit(
      'COCFormController',
      new Objects(defaults).MixAndCreate(options).get
    )
  }

  SendMeta(options) {
    const defaults = {
      scope: this.scope,
      component: this.component
    }
    this.Emit('COCFormMeta', new Objects(defaults).MixAndCreate(options).get)
  }

  MatchedEvent(payloads) {
    return payloads.scope && COC.IsMatchedArrays(this.scope, payloads.scope)
  }
  ReceiveMeta(meta, callback) {
    this.On('COCFormMeta', payloads => {
      if (payloads.meta && payloads.meta == meta)
        if (this.MatchedEvent(payloads)) {
          callback(payloads)
        } else return
      else return
    })
  }

  HandleMeta() {
    if (arguments.length === 0 || arguments[0] === '*') {
      this.SendMeta({
        meta: '*',
        credentials: this.model.meta
      })
      return
    }
    if (this.model.meta[arguments[0]] === undefined) {
      this.Warn(
        'The meta that you are requesting is not available in this CSMA.'
      )
      return
    }
    this.SendMeta({
      meta: arguments[0],
      credentials: this.model.meta[arguments[0]]
    })
    return this.model.control
  }

  Submit() {
    this.Send({
      controller: 'click',
      credentials: null,
      type: 'button'
    })
  }
  Warn(message) {
    this.Logger.Warn(message)
  }
}
