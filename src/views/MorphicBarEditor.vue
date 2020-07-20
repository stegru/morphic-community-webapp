<template>
  <div class="bg-silver rounded p-3">
    <h4 class="mb-3">Morphic Bar Editor</h4>
    <p>Click on any of the empty spaces on the Morphic Bar to put the desired option there.</p>
    <b-form-input v-model="name" placeholder="Morphic Bar Name"></b-form-input>
    <div class="morphicBarBlank bg-white text-center p-2 mt-2">
      <div v-for="option in options"
        class="pt-5 pb-5"
        :class="{ 'option': isOption(option), 'empty': isEmpty(option), 'active': isActive(option) }"
        @click="makeActive(option)"
        >
        <span v-if="isOption(option)">
          {{ option.name }}
        </span>
        <span v-else>
          Click to Add
        </span>
      </div>
      <!-- <div class="empty active pt-5 pb-5">Click to Add</div> -->
    </div>
    <div v-if="pickerActive" class="optionPicker bg-white mt-2" id="optionPicker">
      <b-row>
        <b-col md="7">
          <div class="morphicBarBlank text-center p-2 mt-2 no-border">
            <div v-for="option in availableOptions" @click="addOption(option)" class="option pt-3 pb-3">{{ option }}</div>
          </div>
        </b-col>
        <b-col md="5">
          <b-btn-close @click="pickerActive = false" class="mr-2 mt-2"></b-btn-close>
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
  name: 'MorphicBarEditor',
  components: {
  },
  methods: {
    addOption: function(option) {
      this.options.push({
        id: 1,
        name: option,
        active: false
      });
      this.pickerActive = false;
    },
    isEmpty: function(option) {
      if (option.name === "" || option.id === 0) {
        return true;
      }
      return false;
    },
    isOption: function(option) {
      if (option.name !== "" && option.id > 0) {
        return true;
      }
      return false;
    },
    isActive: function(option) {
      if (option.active) {
        return true;
      }
      return false;
    },
    makeActive: function(option) {
      if (this.options.length > 0) {
        for (var i = this.options.length - 1; i >= 0; i--) {
          this.options[i].active = false
        }
      }
      option.active = true;
      this.pickerActive = true;
    }
  },
  data() {
    return {
      pickerActive: false,
      maxOptions: 10,
      list: [
        {
          id: 0,
          name: "New Morphic Bar",
          desc: "",
          options: []
        },
        {
          id: 1,
          name: "Basic MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"],
        },
        {
          id: 2,
          name: "Magnifier and Text Zoom MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          options: ["Magnifier", "Text Zoom", "High Contrast", "Read Aloud", "Sound Volume"],
        },
        {
          id: 3,
          name: "High Contrast & Text Zoom MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          options: ["High Contrast", "Text Zoom", "Read Aloud", "Sound Volume", "Magnifier"],
        }
      ],
      options: [
        {
          id: 0,
          name: "",
          active: false
        }
      ],
      availableOptions: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"]
    }
  }
}
</script>
