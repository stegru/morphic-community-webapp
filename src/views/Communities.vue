<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3>Our Communities</h3>
        <br/>
        <p>Etiam gravida, orci ut fermentum pharetra, diam mauris aliquam ex, in malesuada felis sem in libero. Aliquam ac risus scelerisque, suscipit enim eget, facilisis orci. Ut dignissim consectetur neque, id dapibus nisl efficitur a. Aenean lobortis tempus libero, vitae mattis risus aliquet ut. Nunc egestas arcu nunc, ut eleifend enim pharetra a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit neque non tortor vestibulum pharetra. Integer laoreet enim quis nisi scelerisque laoreet. Morbi sit amet enim quis mauris viverra venenatis quis vitae nisl.</p>
        <br/>
        <Pagination :items="items"/>
      </b-col>
      <b-col cols="3">
        <InfoLogin />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InfoLogin from '@/components/InfoLogin'
import Pagination from '@/components/Pagination'
import { getPublicCommunities } from '@/services/communityService'

export default {
  components: {
    InfoLogin,
    Pagination
  },
  data: () => ({
    items: null
  }),
  async mounted () {
    try {
      let communities = await getPublicCommunities()
      this.items = communities.data
    } catch (error) {
      if (error.response) {
        console.log(error.response)
      } else {
        console.log('error::Network Error')
        console.log(error)
      }
    }
  }
}
</script>
