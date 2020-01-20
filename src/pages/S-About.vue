<template>
  <div>
    <div class="column items-center" style="height: 150px">
<transition appear enter-active-class="animated slideInUp" leave-active-class="animated fadeOut">
      <q-card dark bordered class="my-card bg-white shadow-7">
        <q-card-section class="text-secondary">
          <div class="text-h6 ">About</div>
          <div class="text-subtitle2">by Imam Satya Wedhatama</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="text-secondary">
          Halo - halo semuanya semoga selalu bahagia seperti pasangan yang baru saja menikah.
          Semoga aplikasinya bermanfaat :D

        </q-card-section>
      </q-card>
</transition>
    </div>

  </div>
</template>
<script>
export default {
  created () {
    this.$q.addressbarColor.set('#7861a9')
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px

</style>
