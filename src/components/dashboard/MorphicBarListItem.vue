<template>
  <div>
    <MorphicBarPreview />
    <b-row>
      <b-col md="6">
        <strong>Morphic Bar Name</strong><br>
      </b-col>
      <b-col md="6">
        <div class="text-right">
          <b-button size="sm" variant="secondary">Make a Copy</b-button>
          <b-button to="/dashboard/morphicbar-editor" variant="primary" class="ml-1">Edit this bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'

export default {
  name: 'MorphicBarListItem',
  components: {
    MorphicBarPreview
  }
}
</script>
