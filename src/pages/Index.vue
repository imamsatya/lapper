<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page> -->
  <div>
    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
      <!-- <div class="q-pa-md" style="max-width: 400px"> -->
      <div class="q-pa-md ubuntu ">
        <div class="row items-start q-col-gutter-lg">
          <div class="col-sm-8 ">
            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Log Tabel</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>

              <!-- <q-separator inset /> -->
              <q-card-section>

                <!-- {{data_stoks_log}} -->
                <!-- filled use-input fill-input input-debounce="0"  -->
                <q-select @input="sisaStokX()" v-model="model" :options="user_stoks" option-label="nama_barang"
                  option-value="nama_barang" label="Pilih Barang">

                </q-select>

                <div v-if="this.model!==null" class="text-primary">
                  <!-- {{model}} -->
                  Satuan : {{model.satuan}} <br>

                  <!-- <q-btn label="Submit" type="submit" @click="sisaStokX()" color="primary" /> -->
                  Stok : {{model.stok}}
                  <!-- <q-input v-model="sisaStok" label="Standard" /> -->
                </div>

                <template>
                  <div class="q-pa-md">
                    <!-- {{user_stoks_log}} -->
                    <q-table title="Stok" :data="data_stoks_log" :columns="columns" row-key="name" :filter="filter"
                      :loading="loading" :pagination.sync="pagination" :visible-columns="visibleColumns"
                      no-data-label="pilih dulu barangnya dan tambah catatannya " class="bg-white text-secondary"
                      no-results-label="Yang kamu cari ngga ada">

                      <template v-slot:header-cell-action="props">
                        <q-th :props="props">
                          <q-icon name="ion-bulb" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-masuk="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-cloud-upload" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-keluar="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-cloud-download" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-penerima="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-contact" size="2em" />
                          {{ props.col.label }}
                        </q-th>

                      </template>
                      <template v-slot:header-cell-tanggal="props">
                        <q-th :props="props">
                          <q-icon name="ion-ios-alarm" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:body="props">
                        <!-- {{props.row}} -->
                        <q-tr :props="props">

                          <q-td key="action">
                            <div class=" q-gutter-sm">
                              <q-btn push round color="blue-5" icon="ion-create" size='sm' @click="edit_dialog(props)">
                                <q-tooltip content-class="bg-blue-5" :offset="[10, 10]">
                                  Edit!
                                </q-tooltip>
                              </q-btn>

                              <q-btn push round color="red-5" icon="ion-trash" size='sm' @click="delete_dialog(props)">
                                <q-tooltip content-class="bg-red-5" :offset="[10, 10]">
                                  Delete
                                </q-tooltip>
                              </q-btn>

                            </div>
                          </q-td>

                          <!-- <q-td key="index" :props="props">
                            <q-badge color="primary">
                              {{ props.row.__index+1 }}
                            </q-badge>
                          </q-td> -->

                          <!-- <q-td key="nama_barang" :props="props">
                            <q-badge color="primary">
                              {{ model.nama_barang }}
                            </q-badge>
                          </q-td> -->

                          <q-td key="satuan" :props="props">
                            <q-badge color="primary">
                              {{ props.row.satuan }}
                            </q-badge>
                          </q-td>

                          <q-td key="masuk" :props="props">
                            <q-badge color="primary">
                              {{ props.row.stok_masuk }}
                            </q-badge>
                          </q-td>
                          <q-td key="keluar" :props="props">
                            <q-badge color="primary">
                              {{ props.row.stok_keluar }}
                            </q-badge>
                          </q-td>

                          <q-td key="penerima" :props="props">
                            <q-badge color="primary">
                              {{ props.row.penerima }}
                            </q-badge>
                          </q-td>

                          <q-td key="tanggal" :props="props">
                            <q-badge color="primary">
                              {{ props.row.time }}
                            </q-badge>
                          </q-td>
                        </q-tr>
                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns" emit-value map-options :options="columns"
                          option-value="name" style="min-width: 150px" />

                        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                          <q-space />

                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>

                          <template v-slot:no-data="{ icon, message, filter }">
                            <div class="full-width row flex-center text-accent q-gutter-sm">
                              <q-icon size="2em" name="sentiment_dissatisfied" />
                              <span>
                                Well this is sad... {{ message }}
                              </span>
                              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                            </div>
                          </template>

                        </q-input>

                      </template>

                      <template v-slot:top-right>
                        <q-select v-model="visibleColumns" multiple borderless dense options-dense
                          :display-value="$q.lang.table.columns" emit-value map-options :options="columns"
                          option-value="name" style="min-width: 150px" />
                        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                          <q-icon slot="append" name="search" />
                        </q-input>

                      </template>

                      <template v-slot:no-data="{ icon, message, filter }">
                        <div class="full-width row flex-center text-secondary q-gutter-sm">
                          <q-icon size="2em" name="sentiment_dissatisfied" />
                          <span>
                            Hmm ga ada apa apa... {{ message }}
                          </span>
                          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                        </div>
                      </template>
                    </q-table>
                  </div>
                </template>

              </q-card-section>

            </q-card>
          </div>

          <div class="col-sm-4">

            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Tambah Log Item</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-card-section>

                <template>
                  <div class="q-pa-md" style="max-width: 400px">
                    <div v-if="this.model!==null">
                      <q-form @submit="onSubmit(id)" @reset="onReset" class="q-gutter-md">
                        <q-input filled v-model="penerima" label="Penerima *" hint="Yang nerima siapa? :)" lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Please type something']" />

                        <q-input filled type="number" v-model="stok_masuk" label="Stok Masuk" min=0 lazy-rules
                          :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" />

                        <q-input filled type="number" v-model="stok_keluar" label="Stok Keluar" min=0 lazy-rules
                          :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" />
                        <!-- lazy-rules
                          :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" -->
                        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                        <div>
                          <q-btn no-caps class="text-weight-light" label="Submit" type="submit" color="primary" />
                          <q-btn no-caps label="Reset" type="reset" color="primary" flat
                            class="q-ml-sm text-weight-light" />
                        </div>
                      </q-form>
                    </div>
                  </div>
                </template>

              </q-card-section>

            </q-card>
          </div>

          <!-- <div class="col-sm-3">

          halo 3
        </div> -->
        </div>
      </div>

    </transition>
    <!-- Edit -->
    <q-dialog v-model="medium">
      <q-card class="text-white">
        <q-bar class="bg-primary">

          <div>Edit Data</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form @submit="updateData(id)" @reset="onReset" class="q-gutter-md">
            <q-input filled label="Penerima *" hint="Yang nerima siapa? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_penerima" />

            <q-input filled type="number" label="Stok Masuk" min=0 lazy-rules
              :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" v-model="edited_stok_masuk" />

            <q-input filled type="number" label="Stok Keluar" min=0 lazy-rules
              :rules="[ val => val && val.length > 0 || 'kalau kosong diisi 0 aja']" v-model="edited_stok_keluar" />

            <q-card-actions align="right">

              <q-btn no-caps class="text-weight-light" flat label="Reset" type="reset" color="white"
                text-color="primary" />
              <q-btn no-caps label="Update" type="submit" color="primary" text-color="white"
                class="q-ml-sm text-weight-light" v-close-popup />
            </q-card-actions>
          </q-form>
        </q-card-section>

      </q-card>
    </q-dialog>

    <!-- Delete -->
    <q-dialog v-model="confirm_delete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="ion-trash" color="primary" text-color="white" />
          <span class="q-ml-sm">Kamu akan menghapusnya untuk selama - lamanya ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ga jadi deh" color="primary" v-close-popup />
          <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="delete_final(id_stoks_log)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>
// export default {
//   name: 'PageIndex'
// }
// const userStoksX = this.user_stoks
export default {
  data () {
    return {
      // delete
      confirm_delete: false,
      id_stoks_log: '',

      // edit
      medium: false,
      edited_penerima: '',
      edited_stok_masuk: '',
      edited_stok_keluar: '',

      data: [],
      data_stoks_log: [],
      model: null,

      filter: '',
      penerima: '',
      stok_masuk: null,
      stok_keluar: null,
      sisaStok: '',
      loading: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      },

      // stringOptions,
      options: [],
      // userStoksX,
      // options: userStoksX,

      columns: [{
        name: 'action',
        align: 'center',
        label: 'Aksi',
        field: 'action',
        sortable: true
      },
      // {
      //   name: 'index',
      //   align: 'left',
      //   label: 'No',
      //   field: row => row.__index,
      //   format: val => `${val}`,
      //   sortable: true
      // },
      // {
      //   name: 'nama_barang',
      //   required: true,
      //   label: 'Nama Barang',
      //   align: 'left',
      //   field: row => row.name,
      //   format: val => `${val}`,
      //   sortable: true
      // },
      // {
      //   name: 'satuan',
      //   align: 'center',
      //   label: 'Satuan',
      //   field: 'satuan',
      //   sortable: true
      // },
      {
        name: 'masuk',
        label: 'Masuk',
        align: 'left',
        field: 'masuk',
        sortable: true
      },
      {
        name: 'keluar',
        label: 'Keluar',
        align: 'left',
        field: 'keluar',
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
      },

      {
        name: 'penerima',
        align: 'center',
        label: 'Penerima',
        field: 'penerima',
        sortable: true
      },
      {
        name: 'tanggal',
        align: 'center',
        label: 'Waktu (M-D-Y)',
        field: 'time',
        sortable: true
      }
        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      visibleColumns: [
        'action',
        // 'index',
        // 'nama_barang',
        // 'satuan',
        'masuk',
        'keluar',
        'penerima',
        'tanggal'
      ]
    }
  },
  created () {
    this.$q.addressbarColor.set('#7861a9')
  },
  firestore () {
    var user = this.$firebase.auth().currentUser
    return {
      stoks: this.$firebase.firestore().collection('stoks'),
      user_stoks: this.$firebase.firestore().collection('stoks').where('user_id', '==', user.uid).orderBy(
        'nama_barang'),
      stoks_log: this.$firebase.firestore().collection('stoks_log'),
      user_stoks_log: this.$firebase.firestore().collection('stoks_log').where('user_id', '==', user.uid)
    }
  },

  methods: {
    // filterFn (val, update) {
    //   if (val === '') {
    //     update(() => {
    //       this.options = userStoksX.nama_barang
    //     })
    //     return
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options = userStoksX.nama_barang.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    async updateData (id) {
      // console.log('ini id', id)
      // console.log('ini stoks log', this.id_stoks_log)

      await this.data_stoks_log.forEach(element => {
        if (element.id === this.id_stoks_log.id) {
          // id_stoks_log
          // console.log(element.id, id)
          // console.log('model', this.model['.key'])
          // console.log('element', element)

          // update stok di view
          // var stokdb = this.model.stok
          // delete dulu
          this.model.stok = parseInt(this.model.stok) + parseInt(element.stok_keluar) - parseInt(element
            .stok_masuk) - parseInt(this.edited_stok_keluar) + parseInt(this.edited_stok_masuk)
          // console.log('stok setelah delete', this.model.stok)
          // update
          // this.model.stok = parseInt(this.model.stok) - parseInt(this.edited_stok_keluar) + parseInt(this.edited_stok_masuk)

          // update stok di database
          this.$firebase.firestore().collection('stoks').doc(id['.key']).update({
            stok: this.model.stok
          })

          // update stok log
          this.$firebase.firestore().collection('stoks_log').doc(element.id).update({
            penerima: this.edited_penerima,
            stok_masuk: this.edited_stok_masuk,
            stok_keluar: this.edited_stok_keluar

          })

          this.$q.notify({
            color: 'positive',
            position: 'top',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay, item log berhasil diupdate :)'
          })

          // delete stok log
          // this.$firebase.firestore().collection('stoks_log').doc(element.id).delete()
        }
      })
      this.sisaStokX()
    },
    edit_dialog (id) {
      // console.log(id)
      this.medium = true
      this.id_stoks_log = id.row
      this.edited_penerima = id.row.penerima
      this.edited_stok_masuk = id.row.stok_masuk
      this.edited_stok_keluar = id.row.stok_keluar
      // this.edited_data.output = this.user_arsip[index].output
      // this.edited_data.komponen = this.user_arsip[index].komponen
    },
    delete_dialog (id) {
      this.confirm_delete = true
      this.id_stoks_log = id.row.id
    },
    async delete_final (id) {
      // // console.log(id)
      // // update stoks
      // // console.log(this.data_stoks_log[0].id)

      await this.data_stoks_log.forEach(element => {
        if (element.id === id) {
          // id_stoks_log
          // console.log(element.id, id)
          // console.log('model', this.model['.key'])
          // console.log('element', element.id)
          // update stok di view
          var stokdb = this.model.stok
          this.model.stok = parseInt(this.model.stok) + parseInt(element.stok_keluar) - parseInt(element
            .stok_masuk)

          // update stok di database
          this.$firebase.firestore().collection('stoks').doc(this.model['.key']).update({
            stok: parseInt(stokdb) + parseInt(element.stok_keluar) - parseInt(element.stok_masuk)
          })

          // delete stok log
          this.$firebase.firestore().collection('stoks_log').doc(id).delete()
        }
      })
      this.$q.notify({
        position: 'top',
        color: 'negative',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay item log telah dihapus :)'
      })

      this.sisaStokX()
    },
    onSubmit (id) {
      this.$q.loadingBar.start()
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      var currentTime = new Date().toLocaleString('en-US', {
        timeZone: timezone
      })
      var user = this.$firebase.auth().currentUser
      // console.log(this.stok_masuk)
      // console.log(this.stok_keluar)
      if (this.stok_masuk === null) {
        // console.log('null')
        this.stok_masuk = 0
      }
      if (this.stok_masuk === '') {
        // console.log('s')
        this.stok_masuk = 0
      }
      if (this.stok_keluar === null) {
        this.stok_keluar = 0
      }
      if (this.stok_keluar === '') {
        // console.log('s')
        this.stok_masuk = 0
      }

      this.$firestore.stoks_log.add({
        user_id: user.uid,
        item_id: this.model['.key'],
        penerima: this.penerima,
        stok_masuk: this.stok_masuk,
        stok_keluar: this.stok_keluar,
        time: currentTime
      })

      // update stoks
      // console.log(id['.key'])
      this.$firebase.firestore().collection('stoks').doc(id['.key']).update({
        stok: parseInt(this.model.stok) + parseInt(this.stok_masuk) - parseInt(this.stok_keluar)
      })
        .then(function (response) {
          // console.log(response)
        })
        .then(
          this.$q.notify({
            position: 'top',
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Yeay item log telah ditambahkan :)'
          })
        ).then(this.model.stok = parseInt(this.model.stok) + parseInt(this.stok_masuk) - parseInt(this.stok_keluar))
        .then(this.sisaStokX())
      this.$q.loadingBar.stop()
      this.onReset()
      // }
    },

    onReset () {
      this.penerima = null
      this.stok_keluar = null
      this.stok_masuk = null
    },
    async selectedStok () {
      var user = this.$firebase.auth().currentUser
      var tes = []

      this.$firebase.firestore().collection('stoks_log').where('user_id', '==', user.uid).where('item_id', '==',
        this
          .model['.key']).orderBy('time', 'desc').onSnapshot(ref => {
        ref.forEach(doc => {
          var data = {
            item_id: doc.data().item_id,
            penerima: doc.data().penerima,
            stok_keluar: doc.data().stok_keluar,
            stok_masuk: doc.data().stok_masuk,
            time: doc.data().time,
            id: doc.id
          }
          tes.push(data)
        })
        this.data_stoks_log = tes
      })
    },
    async sisaStokX () {
      this.id = this.model
      // console.log('id saat selected', this.id)
      await this.selectedStok()
    }

  }
}

</script>
