<template>
<div>
  <template v-for="(value, paramKey, index) in barItem.data.parameters">
    <div v-if="allParameters[paramKey].isApplicable(barItem)"
         :key="paramKey"
         role="group" class="mb-3">
      <b-form-group :label="allParameters[paramKey].label"
                    :label-for="'barItem_' + paramKey"
                    :invalid-feedback="editValidation(paramKey)">

        <component :is="getFieldTag(allParameters[paramKey])"
                   :id="'barItem_' + paramKey"
                   :name="paramKey"
                   v-model="barItem.data.parameters[paramKey]"
                   :options="allParameters[paramKey].selectOptions"
                   :state="getValidationState(paramKey)"
                   :autofocus="!index"
                   :disabled="!allParameters[paramKey].isEnabled(barItem)"
                   v-bind="allParameters[paramKey].attrs"
        />
      </b-form-group>
    </div>
  </template>
</div>
</template>

<style lang="scss">

</style>

<script>

import * as params from "@/utils/params";

export default {
    name: "BarItemFields",
    components: {},
    props: {
        /** @type {BarItem} */
        barItem: Object
    },
    data() {
        return {
            allParameters: params.allParameters
        };
    },
    methods: {
        /**
         * Validate a parameter field in the button edit dialog.
         * @param {String} paramKey The parameter key.
         * @return {String} The validation error message (or null if valid)
         */
        editValidation: function (paramKey) {
            return params.getValidationError(this.barItem, paramKey);
        },
        /**
         * Gets the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for
         * no validation state.
         * @param {String} paramKey The parameter key.
         * @return {Boolean?} The validation state
         */
        getValidationState: function (paramKey) {
            return this.validationRequired(paramKey)
                ? !this.editValidation(paramKey)
                : null;
        },

        /**
         * Determines if validation is required for the given parameter.
         * @param {String} paramKey The parameter key.
         * @return {Boolean} true if the field should be validated.
         */
        validationRequired: function (paramKey) {
            return this.allParameters[paramKey].isEnabled(this.barItem) &&
                this.allParameters[paramKey].isApplicable(this.barItem);
        },

        /**
         * Gets the tag name for a field.
         * @param {ParameterInfo} paramInfo The parameter
         * @return {String} The HTML tag name.
         */
        getFieldTag: function (paramInfo) {
            return paramInfo.selectOptions ? "b-form-select" : "b-form-input";
        }
    }
};
</script>
