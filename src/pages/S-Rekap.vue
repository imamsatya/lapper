<template>
  <!-- <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page> -->
  <div>

    <transition appear enter-active-class="animated zoomIn" leave-active-class="animated fadeOut">
      <!-- <div class="q-pa-md" style="max-width: 400px"> -->
      <div class="q-pa-md ubuntu">
        <!-- <div class="row items-start q-col-gutter-x-md justify-around"> -->
        <div class="row q-col-gutter-lg">
          <div class="col-sm-8 ">
            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Daftar Barang</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
               <q-separator inset color="primary" />
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- {{user_stoks}} -->
                    <q-table title="Stok" :data="user_stoks" :columns="columns" row-key="name" :filter="filter"
                      :loading="loading" :pagination.sync="pagination" :visible-columns="visibleColumns"
                      no-data-label="tambah dulu barangnya" class="bg-white text-secondary"
                      no-results-label="Yang kamu cari ga ada">

                      <template v-slot:header-cell-aksi="props">
                        <q-th :props="props">
                          <q-icon name="ion-bulb" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-nama_barang="props">
                        <q-th :props="props">
                          <q-icon name="ion-cube" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-satuan="props">
                        <q-th :props="props">
                          <q-icon name="ion-hourglass" size="2em" />
                          {{ props.col.label }}
                        </q-th>
                      </template>
                      <template v-slot:header-cell-stok="props">
                        <q-th :props="props">
                          <q-icon name="ion-basket" size="2em" />
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

                          <q-td key="nama_barang" :props="props">
                            <q-badge color="primary">
                              {{ props.row.nama_barang }}
                            </q-badge>
                          </q-td>

                          <q-td key="satuan" :props="props">
                            <q-badge color="primary">
                              {{ props.row.satuan }}
                            </q-badge>
                          </q-td>

                          <q-td key="stok" :props="props">
                            <q-badge color="primary">
                              {{ props.row.stok }}
                            </q-badge>
                          </q-td>
                          <q-td key="time" :props="props">
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
                            Hmm ga ada apa-apa... {{ message }}
                          </span>
                          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                        </div>
                      </template>
                    </q-table>
                  </div>
                </template>

              </q-card-section>

            </q-card>
            <!-- Delete -->
            <q-dialog v-model="confirm_delete" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="ion-trash" color="primary" text-color="white" />
                  <span class="q-ml-sm">Kamu akan menghapusnya untuk selama - lamanya ?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Ga jadi deh" color="primary" v-close-popup />
                  <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="deleteku(id)" />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>

          <div class="col-sm-4">

            <q-card class="my-card shadow-7">
              <q-card-section>
                <div class="text-h6 text-primary ubuntu">Tambah Jenis Barang</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
              </q-card-section>
              <q-separator inset color="primary" />
              <q-card-section>

                <template>
                  <div class="q-pa-md">
                    <!-- {{this.nama_barang + '   ' + this.satuan}} -->
                    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                      <q-input filled v-model="nama_barang" label="Nama Barang *" hint="Nama Barangnya apa ? :)"
                        lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" />

                      <q-input filled v-model="satuan" label="Satuan *" hint="Satuannya apa ? :)" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']" />

                      <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

                      <div>
                        <q-btn no-caps class="text-weight-light" label="Submit" type="submit" color="primary" />
                        <q-btn no-caps label="Reset" type="reset" color="primary" flat
                          class="q-ml-sm text-weight-light" />
                      </div>
                    </q-form>

                  </div>
                </template>

              </q-card-section>

            </q-card>
          </div>

        </div>
      </div>
    </transition>

    <!-- //edit -->
    <q-dialog v-model="medium">
      <q-card class="text-white ">
        <q-bar class="bg-primary">

          <div>Edit Data</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-form @submit="updateData(id)" @reset="onResetEdit" class="q-gutter-md">
            <q-input filled label="Nama Barang *" hint="Barangnya apa? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_nama_barang" />

            <q-input filled label="Satuan *" hint="Satuannya apa? :)" lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']" v-model="edited_satuan" />

            <q-card-actions align="right">

              <q-btn no-caps class="text-weight-light" flat label="Reset" type="reset" color="primary"
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
          <q-btn flat label="Iya beneran" color="primary" v-close-popup @click="delete_final(id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
// export default {
//   name: 'PageIndex'
// }
export default {
  data () {
    return {
      // delete
      id: null,
      confirm_delete: false,

      // edit
      medium: false,
      edited_nama_barang: '',
      edited_satuan: '',

      data: [],
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      filter: '',
      nama_barang: '',
      satuan: '',

      loading: false,
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      },
      columns: [{
        name: 'aksi',
        align: 'left',
        label: 'Aksi',
        field: 'satuan',
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
      {
        name: 'nama_barang',
        required: true,
        label: 'Nama Barang',
        align: 'left',
        field: row => row.nama_barang,
        format: val => `${val}`,
        sortable: true
      },
      {
        name: 'satuan',
        align: 'center',
        label: 'Satuan',
        field: 'satuan',
        sortable: true
      },
      {
        name: 'stok',
        label: 'Stok',
        align: 'left',
        field: 'stok',
        sortable: true
      }

        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      visibleColumns: [
        'aksi',
        // 'index',
        'nama_barang',
        'satuan',
        'stok'

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
    async updateData (id) {
      // console.log('ini id', id)

      await this.user_stoks.forEach(element => {
        if (element['.key'] === this.id.row['.key']) {
          // id_stoks_log
          // console.log(element.id, id)
          // console.log('model', this.id.row['key'])
          // console.log('element', element)

          // update stok di database
          this.$firebase.firestore().collection('stoks').doc(this.id.row['.key']).update({
            nama_barang: this.edited_nama_barang,
            satuan: this.edited_satuan
          })
        }
      })
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, item berhasil diupdate :)'
      })
    },
    edit_dialog (id) {
      this.id = id
      // console.log(id)
      this.medium = true
      // console.log(id)
      // this.id_stoks_log = id.row
      this.edited_nama_barang = id.row.nama_barang
      this.edited_satuan = id.row.satuan

      // this.edited_data.output = this.user_arsip[index].output
      // this.edited_data.komponen = this.user_arsip[index].komponen
    },
    delete_dialog (id) {
      this.confirm_delete = true
      this.id = id
    },
    async delete_final (id) {
      // console.log(id)
      // // update stoks
      // // console.log(this.data_stoks_log[0].id)

      await this.user_stoks.forEach(element => {
        if (element['.key'] === this.id.row['.key']) {
          // id_stoks_log
          // console.log(element.id, id)
          // // console.log('model', this.model['.key'])
          // console.log('element', element.id)
          // update stok di view

          // delete stok log
          // var user = this.$firebase.auth().currentUser

          this.user_stoks_log.forEach(element2 => {
            if (element2.item_id === this.id.row['.key']) {
              this.$firebase.firestore().collection('stoks_log').doc(element2['.key']).delete()
            }
          })

          // delete stok
          this.$firebase.firestore().collection('stoks').doc(element['.key']).delete()

          // this.$firebase.firestore().collection('stoks_log').doc(id).delete()
        }
      })
      this.$q.notify({
        position: 'top',
        color: 'negative',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay item telah dihapus :)'
      })
    },
    onSubmit () {
      // this.$q.notify({
      //   color: 'red-5',
      //   textColor: 'white',
      //   icon: 'warning',
      //   message: 'You need to accept the license and terms first'
      // })
      // dari sini
      this.$q.loadingBar.start()
      var user = this.$firebase.auth().currentUser

      this.$firestore.stoks.add({
        user_id: user.uid,
        nama_barang: this.nama_barang,
        satuan: this.satuan,
        stok: 0,
        time: new Date().toISOString()
      })

      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Yeay, item berhasil ditambahkan :)'
      })
      this.onReset()
    },

    onReset () {
      this.nama_barang = null
      this.satuan = null
      this.accept = false
    },
    onResetEdit () {
      this.edited_nama_barang = null
      this.edited_satuan = null
    }

  }
}

</script>
