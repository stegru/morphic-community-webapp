<template>
  <div class="bg-silver rounded p-3">
    <h4 class="mb-3">Morphic Bar Editor</h4>
    <p>Click on any of the empty spaces on the Morphic Bar to put the desired option there.</p>
    <b-form-input v-model="name" placeholder="Morphic Bar Name"></b-form-input>
    <div class="morphicBarBlank bg-white text-center p-2 mt-2">
      <div class="option pt-5 pb-5">Text Zoom</div>
      <div class="empty active pt-5 pb-5">Click to Add</div>
      <div class="empty pt-5 pb-5">Click to Add</div>
      <div class="empty pt-5 pb-5">Click to Add</div>
      <div class="empty pt-5 pb-5">Click to Add</div>
    </div>
    <div class="optionPicker bg-white mt-2" id="optionPicker">
      <b-row>
        <b-col md="7">
          <div class="morphicBarBlank text-center p-2 mt-2 no-border">
            <div class="option disabled pt-3 pb-3">Text Zoom</div>
            <div class="option pt-3 pb-3">Magnifier</div>
            <div class="option pt-3 pb-3">Read Aloud</div>
            <div class="option pt-3 pb-3">Sound Volume</div>
            <div class="option pt-3 pb-3">High Contrast</div>
          </div>
        </b-col>
        <b-col md="5">
          <b-btn-close class="mr-2 mt-2"></b-btn-close>
          <p class="mt-3">
            Click on any of the available options to add it to the <b class="text-danger">selected</b> position in the Morphic Bar.
            <br>
            <b-link to="/dashboard/learn/morphicbar-customize" class="small">Learn more about customizing</b-link>
          </p>
        </b-col>
      </b-row>
    </div>
    <b-row class="mt-3">
      <b-col md="6">
        <b-button to="/dashboard" variant="primary">Save Changes</b-button>
      </b-col>
      <b-col md="6" class="text-right">
        <b-button to="/dashboard" size="sm" variant="outline-secondary">Cancel</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<style>
  .no-border { 
    border: none !important;
  }
  .morphicBarBlank {
    border: 1px solid silver;
    display: flex;
    justify-content: space-between;
  }
  .morphicBarBlank .option, .morphicBarBlank .empty {
    user-select: none;
    flex-basis: 18%;
    cursor: pointer;
  }

  .morphicBarBlank .option {
    background: green;
    color: white;
    border: 1px solid silver;
  }
  .morphicBarBlank .option:hover {
    background: limegreen;
    color: black;
    border-color: green;
  }
  .morphicBarBlank .option.disabled {
    opacity: .7;
    cursor: not-allowed;
  }

  .morphicBarBlank .empty {
    border: 1px dashed silver;
  }
  .morphicBarBlank .empty:hover {
    border-color: #002957;
    color: #002957;
  }

  .morphicBarBlank .active {
    border-color: orange;
    border-width: 2px;
    background-image: url(/img/arrow_down.png);
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

<script>
  export default {
    data() {
      return {
        name: ''
      }
    }
  }
</script>
