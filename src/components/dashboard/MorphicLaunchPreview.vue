<template>
  <div class="MorphicLaunchPreview">
    <ul class="small">
      <li v-for="option in options">
        <span :class="'text-' + option.color">{{ option.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'MorphicLaunchPreview',
  props: {
    options: Array,
    default: function () {
      return []
    }
  }
}
</script>
