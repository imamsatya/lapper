<template>
  <div>

<!--=====================================================================================================
============================== Halooo !!! ngintip aja bro ================================================
==========================================================================================================

NYARI APA NIH? HEHE...
SELAMAT MENCARI SESUATU YANG DICARI :D

IT'S ONLY WITH THE HEART THAT ONE CAN SEE RIGHTLY , WHAT IS ESSENTIAL IS INVISIBLE TO THE EYE

==========================================================================================================
==========================================================================================================
=======================================================================================================
-->
    <div class="q-pa-md bg-imageku">
      <vue-particles color="#ec519c" :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#ec519c"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"> </vue-particles>
      <q-layout view="hHh Lpr fFf">

        <q-page-container >

          <router-view />
        </q-page-container>

      </q-layout>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      menu_home: true,
      menu_tabel: false,
      menu_about: false,
      left: false,
      drawer: false,
      miniState: true
    }
  },
  methods: {
    goHome () {
      this.menu_home = true
      this.menu_tabel = false
      this.menu_about = false
      this.$router.push('/home')
    },
    goTabel () {
      this.menu_home = false
      this.menu_tabel = true
      this.menu_about = false
      this.$router.push('/rekap')
    },
    goAbout () {
      this.menu_home = false
      this.menu_tabel = false
      this.menu_about = true
      this.$router.push('/about')
    },
    logout: async function () {
      try {
        this.$firebase.auth().signOut()
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}

</script>
<style lang="stylus" scoped>

.text-pinkku {
  color: #f38181;
}
.bg-pinkku {
  background: #f38181;
}
.text-kuningku {
  color: #f0decb;
}
.bg-kuningku {
  background: #f0decb;
}

.bg-imageku{
  background-image:  url('../css/background/background1.jpg')
}
#particles-js {

  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}

</style>
<style lang="sass" scoped>

.ubuntu
  font-family: 'ubuntu'

.pacifico
  font-family: 'pacifico'

.lobster
  font-family: 'lobster'

</style>
