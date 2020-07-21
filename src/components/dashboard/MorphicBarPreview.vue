<template>
  <div class="morphicBarPreview bg-white text-center p-2 mb-2">
    <div v-for="option in options" class="option pt-4 pb-4" :key="option.label">{{ option }}</div>
  </div>
</template>

<style>
  .morphicBarPreview {
    display: flex;
    justify-content: space-between;
  }
  .morphicBarPreview .option  {
    user-select: none;
    flex-basis: 18%;
    background: green;
    color: white;
    border: 1px solid silver;
    font-size: .85rem;
  }
</style>

<script>

export default {
  name: 'MorphicBarPreview',
  props: {
    options: Array,
    default: function () {
      return ['Text Zoom', 'Magnifier', 'Read Aloud', 'Sound Volume', 'High Contrast']
    }
  }
}
</script>