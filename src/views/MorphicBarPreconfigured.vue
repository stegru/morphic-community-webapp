<template>
  <div>
    <b-row>
      <b-col md="4">
        <div class="bg-light rounded p-3">
        </div>
      </b-col>
      <b-col md="8">
        <div class="bg-silver rounded p-3">
          <h4 class="mb-3">Pick any of these Morphic Bar's, or start with a fresh one</h4>
          <MorphicBarPicker />
          <hr class="mt-4 mb-4">
          <MorphicBarPicker />
          <hr class="mt-4 mb-4">
          <MorphicBarPicker />
          <hr class="mt-4 mb-4">
          <MorphicBarBlank class="mb-2" />
          <b-row>
            <b-col md="8">
              <strong>Start with a blank bar</strong><br>
              <p class="small mb-0">If you are a power user, you might wish to start with a blank Morphic Bar and manually pick witch options you want to include in it.</p>
            </b-col>
            <b-col md="4">
              <div class="text-right">
                <b-button to="/dashboard/morphicbar-editor" size="sm" variant="success">Start with blank bar</b-button>
              </div>
            </b-col>
          </b-row>

          <div class="text-right">
            <b-button to="/dashboard/welcome" variant="outline-secondary" class="ml-1">Cancel</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarPicker from '@/components/dashboard/MorphicBarPicker'
import MorphicBarBlank from '@/components/dashboard/MorphicBarBlank'

export default {
  name: 'MorphicBarPreconfigured',
  components: {
    MorphicBarPicker,
    MorphicBarBlank
  }
}
</script>
