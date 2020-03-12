// import something here
import {
  AddressbarColor
} from 'quasar'

import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// import excel from 'vue-excel-export'

// Vue.use(excel)
// import VueXlsx from 'vue-js-xlsx'
// Vue.use(VueXlsx)

import XLSX from 'xlsx'
Vue.use(XLSX)

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  AddressbarColor.set('#7861a9')
}
