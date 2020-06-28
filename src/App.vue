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

  .btn-primary {
    background-color: #002957 !important;
    border-color: #002957 !important;
  }
  .btn-success {
    background-color: #84c661 !important;
    border-color: #84c661 !important;
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
};
</script>
