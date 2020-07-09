<template>
  <div>
    <MorphicBarPreview :options=bar.options />
    <b-row>
      <b-col md="6">
        <strong>{{ bar.name }}</strong>
      </b-col>
      <b-col md="6">
        <div class="text-right">
          <b-button size="sm" variant="secondary">Make a Copy</b-button>
          <b-button :to="'/dashboard/morphicbar-editor/' + bar.id" variant="primary" class="ml-1">Edit this bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'

export default {
  name: 'MorphicBarListItem',
  props: {
    bar: Object,
    default: function () {
      return {
        id: 0,
        name: 'Morphic Bar Name',
        options: ['Text Zoom', 'Magnifier', 'Read Aloud', 'Sound Volume', 'High Contrast']
      }
    }
  },
  components: {
    MorphicBarPreview
  }
}
</script>
