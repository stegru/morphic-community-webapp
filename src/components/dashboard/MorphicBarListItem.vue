<template>
  <div>
    <MorphicBarPreview :options=barDetails.items />
    <b-row>
      <b-col md="6">
        <strong>{{ barDetails.name }}</strong>
      </b-col>
      <b-col md="6">
        <div class="text-right">
          <b-button size="sm" variant="secondary">Make a Copy</b-button>
          <b-button :to="'/dashboard/morphicbar-editor/' + barDetails.id" variant="primary" class="ml-1">Edit this bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'
import { getCommunityBar } from '@/services/communityService'

export default {
  name: 'MorphicBarListItem',
  data () {
    return {
      barDetails: {}
    }
  },
  props: {
    bar: Object
  },
  components: {
    MorphicBarPreview
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    getCommunityBar(this.communityId, this.bar.id)
      .then(resp => {
        this.barDetails = resp.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
