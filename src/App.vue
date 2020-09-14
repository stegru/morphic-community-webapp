<template>
  <b-container fluid>
    <Header />
    <router-view />
    <Footer />
  </b-container>
</template>

<style lang="scss">
  $primary-color: #002957;
  $secondary-color: #84c661;

  body {
    font-family: 'Open Sans', sans-serif !important;
  }

  .fill-height {
    min-height: 100%;
  }

  .btn-primary {
    background-color: $primary-color !important;
    border-color: $primary-color !important;
  }
  .btn-success {
    background-color: $secondary-color !important;
    border-color: $secondary-color !important;
  }

  .bg-silver {
    background: #eee;
  }

  .text-bronze {
    color: #cd7f32;
  }

  .text-gold {
    color: gold;
  }

  .text-silver {
    color: silver;
  }

  .rounded {
    border-radius: 1rem;
  }

  .desktop {
    background: url(/img/background-editor.png);
    position: relative;
    display: flex;

    .preview-bar {
      padding-bottom: 5rem;
    }

    .openDrawerIconHolder {
      .b-icon {
        margin-left: -19px;
        font-size: 2em;
        position: absolute;
        bottom: 25px;
        background: black;
        color: white;
        border-radius: 100%;
        border: 1px solid black;
      }
    }
  }

  .logoHolder {
    padding-top: 15px;
    padding-bottom: 15px;

    img {
      width: 3rem;
      height: 3rem;
    }
  }


</style>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
}
</script>
