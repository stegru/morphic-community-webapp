<template>
  <b-container>
    <Header />
    <router-view />
    <Footer />
  </b-container>
</template>

<style>
  body {
    font-family: 'Open Sans', sans-serif !important;
  }

  .fill-height {
  	min-height: 100%;
  }

  .btn-primary {
    background-color: #002957 !important;
    border-color: #002957 !important;
  }
  .btn-success {
    background-color: #84c661 !important;
    border-color: #84c661 !important;
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
