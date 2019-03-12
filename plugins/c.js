import COC from './c/index.js'
import moment from 'moment'
import lodash from 'lodash'
import pkg from '~/package'
import Vue from 'vue'
export default ({ app: { router }, env }, inject) => {
  // Init COC
  COC.Init({
    Vue,
    lodash,
    moment
  })
  // Config app data
  COC.Config.Meta({
    name: pkg.name,
    brandName: 'CocJs',
    version: pkg.version,
    repository: pkg.repository,
    author: pkg.author,
    mode: env.mode,
    logo: {
      primary: '/snaps/COC.png',
      invert: '/snaps/COC-Invert.png'
    },
    social: {
      facebook: {
        label: 'Facebook',
        avatarProps: {
          icon: 'ivu-icon ivu-icon-logo-facebook'
        },
        url: 'https://facebook.com'
      },
      instagram: {
        label: 'Instagram',
        avatarProps: {
          icon: 'ivu-icon ivu-icon-logo-instagram'
        },
        url: 'https://instagram.com'
      },
      twitter: {
        label: 'Twttier',
        avatarProps: {
          icon: 'ivu-icon ivu-icon-logo-twitter'
        },
        url: 'https://twitter.com'
      }
    }
  })
  // Docker
  const Docker = new COC.Docker()
  Docker.AddItems([
    {
      icon: 'ivu-icon ivu-icon-ios-home-outline',
      label: 'Home',
      id: 'home',
      callback: () => {
        router.push('/')
      }
    },
    {
      icon: 'ivu-icon ivu-icon-ios-bug-outline',
      label: 'Validate',
      id: 'validate',
      callback: () => {
        router.push('/demo/validate')
      }
    },
    {
      icon: 'ivu-icon ivu-icon-ios-hammer-outline',
      label: 'Demos',
      id: 'demos',
      callback: () => {
        router.push('/demo')
      }
    },
    {
      icon: 'ivu-icon ivu-icon-ios-alert-outline',
      label: 'Show Alert',
      id: 'alert',
      callback() {
        alert('Once a COC, always a COC!')
      }
    }
  ])
  COC.Config.Defaults({ Docker })
  inject('coc', COC)
}
