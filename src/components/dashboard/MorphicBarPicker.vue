<template>
  <div>
    <MorphicBarPreview :options="bar.options" />
    <b-row>
      <b-col md="8">
        <strong>{{ bar.name }}</strong><br>
        <p class="small mb-0">{{ bar.desc }}</p>
      </b-col>
      <b-col md="4">
        <div class="text-right">
          <b-button :to="'/dashboard/morphicbar-editor/' + bar.id" size="sm" variant="primary">Start with this Bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'

export default {
  name: 'MorphicBarPicker',
  props: {
    bar: Object,
    default: function () {
      return {}
    }
  },
  components: {
    MorphicBarPreview
  }
}
</script>
