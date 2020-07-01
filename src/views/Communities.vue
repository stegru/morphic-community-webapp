<template>
  <b-jumbotron class="bg-light">
    <h3>Our Communities</h3>
    <br/>
    <p>Etiam gravida, orci ut fermentum pharetra, diam mauris aliquam ex, in malesuada felis sem in libero. Aliquam ac risus scelerisque, suscipit enim eget, facilisis orci. Ut dignissim consectetur neque, id dapibus nisl efficitur a. Aenean lobortis tempus libero, vitae mattis risus aliquet ut. Nunc egestas arcu nunc, ut eleifend enim pharetra a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit neque non tortor vestibulum pharetra. Integer laoreet enim quis nisi scelerisque laoreet. Morbi sit amet enim quis mauris viverra venenatis quis vitae nisl.</p>
    <br/>
    <b-alert variant="danger" :show="errorAlert">
      {{ errorMessage }}
    </b-alert>
    <Pagination :items="items"/>
  </b-jumbotron>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getPublicCommunities } from '@/services/communityService'
import { ERROR_MAP } from '@/utils/constants'

export default {
  components: {
    Pagination
  },
  data: () => ({
    items: null,
    errorAlert: false,
    errorMessage: null
  }),
  async mounted () {
    try {
      const communities = await getPublicCommunities()
      this.items = communities.data
    } catch (err) {
      if (err.response) {
        this.errorMessage = ERROR_MAP[err.response.status] || 'Something went wrong'
      } else {
        this.errorMessage = ERROR_MAP[500]
      }
      this.errorAlert = true
    }
  }
}
</script>
