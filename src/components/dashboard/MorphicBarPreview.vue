<template>
  <div class="morphicBarPreview bg-white text-center p-2 mb-2">
    <div class="option pt-3 pb-3">Text Zoom</div>
	<div class="option pt-3 pb-3">Magnifier</div>
	<div class="option pt-3 pb-3">Read Aloud</div>
	<div class="option pt-3 pb-3">Sound Volume</div>
	<div class="option pt-3 pb-3">High Contrast</div>
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