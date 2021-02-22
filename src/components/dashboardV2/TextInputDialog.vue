<template>
  <b-modal :id="id" :title="title"
           @ok="onOK"
           @cancel="onCancel"
           @show="newValue = value"
  >
    <b-form-group :label="prompt">
      <b-form-input v-model="newValue"
                    autofocus required
                    @keydown.native.enter="onEnter"
                    :state="newValue === value ? null : (newValue !== '')"
      />
    </b-form-group>
  </b-modal>

</template>

<script>

/**
 * Event object for the `ok` event.
 * @typedef {Object} TextInputOKEvent
 * @property {String} oldValue The original value.
 * @property {String} newValue The new value.
 * @property {Promise?} promise Resolves with true to dismiss the dialog.
 */

export default {
    name: "TextInputDialog",
    props: {
        title: String,
        prompt: String,
        value: String,
        id: String
    },
    data: function () {
        return {
            newValue: null
        };
    },
    methods: {
        onEnter: function (event) {
            this.onOK(event);
        },
        /**
         * OK button was clicked. Raises an "ok" event, and closes the dialog. If the event object comes back with the
         * promise field set, then the dialog is closed when the promise resolves with true.
         * @param {Event} event BvModalEvent object.
         */
        onOK: function (event) {
            event.preventDefault();
            const okEvent = {
                oldValue: this.value,
                newValue: this.newValue,
                promise: undefined
            };

            this.$emit("ok", okEvent);

            const p = okEvent.promise || Promise.resolve(true);

            p.then(success => {
                if (success) {
                    this.$emit("input", this.newValue);
                    this.hideDialog();
                }
            });

        },
        hideDialog: function () {
            this.$bvModal.hide(this.id);
        },
        onCancel: function () {

        }
    }
};
</script>

<style scoped>

</style>
