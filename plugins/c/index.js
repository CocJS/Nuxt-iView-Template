import COC from './modules/Core'
import Arrays from './modules/Arrays'
import Queue from './modules/Arrays/queue'
import CircularQueue from './modules/Arrays/circularQueue'
import Objects from './modules/Objects'
import $ from './modules/Dommer'
import Event from './modules/Events'
import Validator from './modules/Validate'
import FormController from './modules/FormController'
import Filters from './modules/Filters'
import Logger from './modules/Logger'
import Docker from './modules/Docker'

// COC.VUE
// Vue Directives
import CocLoading from './directives/CocLoading'
import CocMouseOver from './directives/CocMouseOver'
import CocMouseLeave from './directives/CocMouseLeave'
import CocMouseDown from './directives/CocMouseDown'
import CocMouseUp from './directives/CocMouseUp'

// MASTER COMPONENTS
import CocInput from './components/Forms/CocInput.vue'
import CocSelect from './components/Forms/CocSelect.vue'
import CocRadio from './components/Forms/CocRadio.vue'
import CocDate from './components/Forms/CocDate.vue'
import CocButton from './components/Forms/CocButton.vue'
import CocFormAtom from './components/Forms/CocFormAtom.vue'
import CocFormItem from './components/Forms/CocFormItem.vue'
import CocForm from './components/Forms/CocForm.vue'
import CocAxios from './components/Assistants/CocAxios.vue'
import CocWatchMyWindow from './components/Assistants/CocWatchMyWindow.vue'
import CocCollapse from './components/Assistants/CocCollapse.vue'
import CocShowKeys from './components/Assistants/CocShowKeys.vue'
import CocMainMaster from './components/Layouts/Masters/CocMainMaster.vue'
import CocMasterFooter from './components/Layouts/Partials/CocMasterFooter.vue'
import CocLayoutDocker from './components/Layouts/Partials/Docker.vue'
import CocMasterNav from './components/Layouts/Partials/CocMasterNav.vue'
import CocLayoutMasterSplitted from './components/Layouts/Masters/Initials/CocLayoutMasterSplitted.vue'
import CocPureInput from './components/CocPureForms/CocPureInput.vue'
import CocOption from './components/CocPureForms/Partials/CocOption.vue'
import './assets/sass/index.scss'
  
// Injecting Into Coc Core

COC.Arrays = Arrays
COC.Queue = Queue
COC.Logger = Logger
COC.CircularQueue = CircularQueue
COC.Objects = Objects
COC.$ = $
COC.Event = Event
COC.FormController = FormController
COC.Validator = Validator
COC.Filters = Filters
COC.Docker = Docker

COC.Init = options => {
	const Vue = options.Vue
	const lodash = options.lodash
	const moment = options.moment
	const components = {
		CocInput,
		CocSelect,
		CocRadio,
		CocDate,
		CocButton,
		CocFormAtom,
		CocFormItem,
		CocForm,
		CocAxios,
		CocCollapse,
		CocWatchMyWindow,
		CocShowKeys,
		CocMainMaster,
		CocMasterFooter,
		CocMasterNav,
		CocLayoutMasterSplitted,
		CocLayoutDocker,
		CocPureInput,
		CocOption
	}
	const directives = {
		CocLoading,
		CocMouseOver,
		CocMouseLeave,
		CocMouseDown,
		CocMouseUp
	}
	Object.keys(components).forEach(key => {
		Vue.component(key, components[key])
	})
	Object.keys(directives).forEach(key => {
		Vue.directive(key, directives[key])
	})
	Object.keys(Filters).forEach(key => {
		Vue.filter(`Coc${key}`, Filters[key])
	})
	Vue.prototype.$moment = moment
	Vue.prototype.$_ = lodash
}
export default COC
