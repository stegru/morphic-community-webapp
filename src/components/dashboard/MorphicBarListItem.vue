<template>
  <div class="bg-silver rounded p-3">
    <b-row>
      <b-col md="9">
        <h5><b>{{ bar.name }}</b></h5>
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
        <RenderList :items="bar.items" />
      </b-col>
      <b-col md="3">
        <div class="text-right">
          <b-button size="sm" variant="light" class="btn-block">Preview</b-button>
          <b-button size="sm" variant="secondary" class="btn-block mt-1">Make a Copy</b-button>
          <b-button :to="'/dashboard/morphicbar-editor/' + bar.id" size="sm" variant="primary" class="btn-block mt-1">Edit</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import RenderList from '@/components/dashboard/RenderList'

export default {
  name: 'MorphicBarListItem',
  props: {
    bar: Object
  },
  components: {
    RenderList
  }
}
</script>
