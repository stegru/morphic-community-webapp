<template>
  <div id="MorphicBarPreconfigured">
    <h4 class="mb-3">Pick any of these Morphic Bar's, or start with a fresh one</h4>
    <MorphicBarPicker v-for="bar in list" :key="bar.id" :bar=bar class="mb-2" />
    <div class="bg-silver rounded p-3">
      <b-row>
        <b-col md="8">
          <strong>Start with a blank bar</strong><br>
          <p class="small mb-0">If you are a power user, you might wish to start with a blank Morphic Bar and manually pick witch options you want to include in it.</p>
        </b-col>
        <b-col md="4">
          <div class="text-right">
            <b-button to="/dashboard/morphicbar-editor/0" size="sm" variant="primary">Start with blank bar</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import MorphicBarPicker from '@/components/dashboard/MorphicBarPicker'

import { availableItems } from '@/utils/constants'

export default {
  name: 'MorphicBarPreconfigured',
  components: {
    MorphicBarPicker
  },
  data () {
    return {
      availableItems: availableItems
    }
  },
  computed: {
    list () {
      return [
        {
          id: 1,
          name: 'Basic MorphicBar',
          desc: 'This Morphic Bar is designed to match your needs when using it as...',
          is_shared: true,
          items: this.availableItems
        },
        {
          id: 2,
          name: 'Magnifier and Text Zoom MorphicBar',
          desc: 'This Morphic Bar is designed to match your needs when using it as...',
          is_shared: true,
          items: this.availableItems
        },
        {
          id: 3,
          name: 'High Contrast & Text Zoom MorphicBar',
          desc: 'This Morphic Bar is designed to match your needs when using it as...',
          is_shared: true,
          items: this.availableItems
        }
      ]
    }
  }
}
</script>
