// import something here
import {
  AddressbarColor
} from 'quasar'

import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  AddressbarColor.set('#7861a9')
}
