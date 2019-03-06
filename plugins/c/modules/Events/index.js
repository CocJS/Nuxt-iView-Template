import Objects from '../Objects'
export default class Event extends Objects {
  constructor() {
    super({})
    this.defaults = {
      api: '$nuxt',
      listener: '$on',
      emit: '$emit'
    }
    const options = arguments.length ? arguments[0] : null
    this.api = options.api ? options && options.api : this.defaults.api
    this.listener =
      options && options.listener ? options.listener : this.defaults.listener
    this.emit = options && options.emit ? options.emit : this.defaults.emit
    this.val = this
  }
  // Listeners

  //Single Listener
  On(event, callback) {
    this.api[this.listener](event, callback)
  }
  // Many Events, Same Callback
  OnMultiple(events, callback) {
    let i
    for (i = 0; i < events.length; i += 1) {
      this.On(events[i], callback)
    }
  }
  // Quick Setup, object of events names as attributes, callback as their values
  OnMap(map) {
    let i
    const keys = Object.keys(map)
    for (i = 0; i < keys.length; i += 1) {
      this.On(keys[i], map[keys[i]])
    }
  }
  Emit(event, payload) {
    this.api[this.emit](event, payload)
  }
}
