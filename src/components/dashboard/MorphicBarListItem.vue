<template>
  <div class="bg-silver rounded p-3">
    <b-row>
      <b-col md="9">
        <h5><b>{{ barDetails.name }}</b></h5>
      </b-col>
      <b-col md="3">
        <div class="text-right small">
          <span v-if="bar.showDetails" @click="bar.showDetails = false">(<b-link>Hide Details</b-link>)</span>
          <span v-else @click="bar.showDetails = true">(<b-link>Show Details</b-link>)</span>
        </div>
      </b-col>
    </b-row>
    <b-row :class="{ 'd-none': bar.showDetails === false }">
      <b-col md="9">
        <RenderList v-if="barDetails.items" :barId="bar.id" />
      </b-col>
      <b-col md="3">
        <div class="text-right">
          <b-button size="sm" variant="secondary" class="btn-block mt-1" @click="emitModalEvent">Make a Copy</b-button>
          <b-button size="sm" variant="light" class="btn-block">Preview</b-button>
          <b-button :to="'/dashboard/morphicbar-editor/' + barDetails.id" size="sm" variant="primary" class="btn-block mt-1">Edit</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RenderList from '@/components/dashboard/RenderList'
import { getCommunityBar } from '@/services/communityService'

export default {
  name: 'MorphicBarListItem',
  components: {
    RenderList
  },
  props: {
    bar: Object
  },
  data () {
    return {
      barDetails: {}
    }
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
  },
  methods: {
    emitModalEvent: function () {
      this.$emit('open-modal', this.barDetails)
    }
  }
}
</script>
