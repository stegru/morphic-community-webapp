<template>
  <div class="bg-silver rounded p-3">
    <RenderList :items="bar.items" />
    <b-row>
      <b-col md="10">
        <strong>{{ bar.name }}</strong><br>
        <p class="small mb-0">{{ bar.desc }}</p>
      </b-col>
      <b-col md="2">
        <b-button size="sm" variant="light" class="btn-block">Preview</b-button>
        <b-button :to="'/dashboard/morphicbar-editor/' + bar.id" size="sm" variant="primary" class="btn-block mt-1">Start with this Bar</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import RenderList from '@/components/dashboard/RenderList'

export default {
  name: 'MorphicBarPicker',
  props: {
    bar: Object
  },
  components: {
    RenderList
  }
}
</script>
