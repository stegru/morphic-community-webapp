<template>
  <div class="morphicButton text-center p-4 pl-1 pr-1 rounded" :class="{ 'empty': button.kind === 'empty', 'active': button.active }">
    <b>{{ button.label }}</b>
  </div>
</template>

<style>
  .morphicButton {
    display: inline-block;
    background: #002957;
    border: 1px solid #002957;
    color: white;
    cursor: pointer;
  }
  .morphicButton.empty {
    background: white;
    border: 1px dashed #002957;
    color: red;
  }
  .morphicButton.empty b {
    visibility: hidden;
  }
  .morphicButton.active {
    border-color: green;
    color: green;
  }
  .morphicButton.active b {
    visibility: visible;
  }
  .morphicButton:active, .morphicButton:hover {
    border-color: black;
  }
</style>

<script>
  
export default {
  name: 'EditorPreviewButton',
  props: {
    button: Object
  }
}
</script>