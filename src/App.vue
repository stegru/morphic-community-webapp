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
    .barPreview {
      padding-bottom: 5rem;
    }
    .logoHolder {
      position: absolute;
      bottom: 1rem;
      width: 100%;
      padding: 0 !important;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    .openDrawerIconHolder {
      position: absolute;
      bottom: 1rem;
      left: -1.5rem;
      width: 3rem;
      background: white;
      border-radius: 100%;
      padding: 2px;
      .b-icon {
        font-size: 3rem;
        color: $primary-color;
      }
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
