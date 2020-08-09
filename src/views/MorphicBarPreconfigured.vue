<template>
  <div id="MorphicBarPreconfigured">
    <h4>Starter Bars</h4>
    <p class="mb-3">Pick one of the Morphic Bars below as a starting place, or start with a blank Bar.</p>
    <b-row class="mb-3">
      <b-col md="3" v-for="bar in list" v-bind:key="bar.id">
        <div class="bg-silver rounded p-3">
          <BarPreview :barData="bar" />
          <p> {{ bar.desc }}</p>
          <b-button :to="'/dashboard/morphicbar-editor/' + bar.id" variant="primary" class="btn-block">Start customizing this Bar</b-button>
        </div>
      </b-col>
    </b-row>
    <div class="bg-silver rounded p-3">
      <b-row>
        <b-col md="8">
          <strong>Start from scratch and make your own</strong><br>
          <p class="small mb-0">If you do not think one of the ones above is a good starting point, you can make your own Morphic Bar.</p>
        </b-col>
        <b-col md="4">
          <div class="text-right">
            <b-button to="/dashboard/morphicbar-editor/new" variant="primary">Customize starting with an empty Bar</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import BarPreview from '@/components/dashboard/BarPreview'
import predefinedBars from '@/utils/predefined'

export default {
  name: 'MorphicBarPreconfigured',
  components: {
    BarPreview
  },
  data () {
    return {
      list: predefinedBars
    }
  }
}
</script>
