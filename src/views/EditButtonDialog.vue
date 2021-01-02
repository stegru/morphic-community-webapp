<template>
  <b-modal id="modalEditGeneric"
           @ok="closeDialog(true)" @cancel="closeDialog(false)"
           size="lg" scrollable centered
           footer-bg-variant="light"
           ok-title="Update Button"
           title="Edit button">
    <div v-if="button">
      <b-form>
        <b-row>
          <b-col md="6">
            <div v-for="(value, paramKey, index) in button.configuration.parameters"
                 :key="paramKey"
                 role="group" class="mb-3">
              <b-form-group :label="allParameters[paramKey].label"
                            :label-for="'barItem_' + paramKey"
                            :invalid-feedback="editValidation(paramKey)">
                <b-form-input :id="'barItem_' + paramKey"
                              :name="paramKey"
                              v-model="button.configuration.parameters[paramKey]"
                              :state="!editValidation(paramKey)"
                              :autofocus="!index"
                              v-bind="allParameters[paramKey].attrs"
                />
              </b-form-group>
            </div>

            <div class="bg-silver rounded p-3">
              <p v-if="showExtra" class="text-right small mb-0">
                (<b-link @click="showExtra = false">Hide</b-link>)
              </p>
              <p v-else class="small">
                Optional: <b-link @click="showExtra = true">Customize the button (color &amp; picture)</b-link>
              </p>
              <div v-if="showExtra">
                <h6><b>Color for button</b></h6>
                <div class="bg-white rounded p-3 mb-4">
                  <div
                          v-for="(hex, name) in colors"
                          :key="name"
                          @click="changeColor(hex)"
                          :title="name"
                          :class="{ active: (button.configuration.color || colors.blue) === hex }"
                          class="colorBoxHolder"
                  >
                    <div :style="'background-color: ' + hex + ';'" class="colorBox"></div>
                  </div>
                </div>

                <h6><b>Picture for button</b></h6>
                <div class="bg-white rounded p-3 compactIconHolder">
                  <div class="iconBoxHolder" :class="{ active: (!button.configuration.image_url) }">
                    <div
                            @click="changeIcon('')"
                            :style="'border-color: ' + (button.configuration.color || colors.blue) + ';'"
                            class="iconBox"
                    >
                      <p>No image</p>
                    </div>
                  </div>
                  <div v-for="(filename, icon) in listedIcons"
                       :key="icon"
                       @click="changeIcon(icon)"
                       :class="{ active: button.configuration.image_url === icon }"
                       class="iconBoxHolder"
                  >
                    <div :style="'border-color: ' + (button.configuration.color || colors.blue) + ';'" class="iconBox">
                      <b-img :src="getIconUrl(icon)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="max-height bg-silver rounded p-3 text-center">
              <p class="text-right small"><b-link @click="buttonToRemove(button)" class="text-danger">Remove Button</b-link></p>
              <p class="">This is the button you are making</p>
              <div class="barPreview rounded">
                <div class="previewHolder">
                  <PreviewItem :item="button" />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-modal>

</template>

<script>
import PreviewItem from "@/components/dashboard/PreviewItem";
import { colors, icons, defaultIcons, groupedIcons } from "@/utils/constants";
import * as params from "@/utils/params";

export default {
    name: "EditButtonDialog",
    props: [],

    components: {
        PreviewItem
    },

    data() {
        return {
            /**
             * The item selected in the parent editor
             * @type {BarItem}
             */
            selectedItem: null,
            /**
             * The copy of the item currently being edited.
             * @type {BarItem}
             */
            button: null,
            allParameters: params.allParameters,
            showExtra: false,

            dialogClosed: null,

            colors: colors
        };
    },

    computed: {
        /**
         * Gets the icons to be shown in the list.
         */
        listedIcons: function () {
            const defaultIcon = defaultIcons[this.button.buttonKey];
            const iconKeys = [];

            // Get the icons of the same category.
            var group = groupedIcons[this.button.subkind];
            if (!group && this.button.subkind.startsWith("local-")) {
                group = groupedIcons[this.button.subkind.substr(6)];
            }

            if (group) {
                iconKeys.push.apply(iconKeys, group);
            }

            // Add the generic icons
            iconKeys.push.apply(iconKeys, groupedIcons.generic);

            const togo = {};
            if (defaultIcon) {
                togo[defaultIcon] = icons[defaultIcon];
            }

            iconKeys.forEach(key => {
                togo[key] = icons[key];
            });

            return togo;
        }
    },

    methods: {
        /**
         * Validate a parameter field in the button edit dialog.
         * @param {String} paramKey The parameter key.
         * @return {String} The validation error message (or null if valid)
         */
        editValidation: function (paramKey) {
            return params.getValidationError(this.button, paramKey);
        },
        changeColor: function (hex) {
            this.button.configuration.color = hex;
        },
        changeIcon: function (icon) {
            this.button.configuration.image_url = icon;
        },
        /**
         * Closes the dialog.
         * @param {Boolean} applyChanges true to apply the changes.
         */
        closeDialog: function (applyChanges) {
            if (applyChanges) {
                this.selectedItem.configuration = JSON.parse(JSON.stringify(this.button.configuration));
            }
            this.selectedItem = null;
            this.$bvModal.hide("modalEditGeneric");
            this.dialogClosed(applyChanges);
        },
        /**
         * Shows the dialog, editing the selected item.
         * @param {BarItem} selectedItem The item to edit.
         * @return {Promise<Boolean>} Resolves when the dialog is closed, value indicating if the item was updated.
         */
        showDialog: function (selectedItem) {
            this.selectedItem = selectedItem;
            this.button = JSON.parse(JSON.stringify(this.selectedItem));
            this.$bvModal.show("modalEditGeneric");
            return new Promise((resolve) => {
                this.dialogClosed = resolve;
            });
        }
    },

    watch: {
        "button.configuration": {
            handler: function (newValue, oldValue) {
                params.applyParameters(this.button);
            },
            deep: true
        }
    }
};
</script>

<style scoped>

</style>
