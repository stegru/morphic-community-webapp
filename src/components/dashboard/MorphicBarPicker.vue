<template>
  <div>
    <MorphicBarPreview />
    <b-row>
      <b-col md="8">
        <strong>Preconfigured Morphic Bar Name</strong><br>
        <p class="small mb-0">This Morphic Bar is designed to match your needs when using it as...</p>
      </b-col>
      <b-col md="4">
        <div class="text-right">
          <b-button to="/dashboard/morphicbar-editor" size="sm" variant="primary">Start with this Bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'

export default {
  name: 'MorphicBarPicker',
  components: {
    MorphicBarPreview
  }
}
</script>
