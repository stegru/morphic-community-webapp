<template>
  <div class="morphicBarBlank bg-white text-center p-2">
    <div class="placeholder pt-4 pb-5">&nbsp;</div>
    <div class="placeholder pt-4 pb-5">&nbsp;</div>
    <div class="placeholder pt-4 pb-5">&nbsp;</div>
    <div class="placeholder pt-4 pb-5">&nbsp;</div>
    <div class="placeholder pt-4 pb-5">&nbsp;</div>
  </div>
</template>

<style>
  .morphicBarBlank {
    border: 1px solid silver;
    display: flex;
    justify-content: space-between;
  }
  .morphicBarBlank .placeholder {
    flex-basis: 18%;
    border: 1px dashed silver;
  }
</style>
