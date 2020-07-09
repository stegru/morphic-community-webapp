<template>
  <div>
    <b-modal id="sendConfirm" @ok="gotoEditor" title="Sending the Invite" footer-bg-variant="light" ok-title="Go">
      <p class="my-4">If you leave the member editor all of your changes will be lost. Are you sure you want to go now?</p>
    </b-modal>
    <div class="bg-silver rounded p-3">
      <h4 class="mb-3">Member Editor</h4>
      <h5>{{ member.name }}</h5>
      <b-link :href="'mailto:'+member.email">{{ member.email }}</b-link>
      <hr>
      <p>
        Joined: <b>{{ member.joined }}</b><br>
        Last used Morphic: <b>{{ member.lastUsed }}</b>
      </p>
      <p>
        Invited by: <b>{{ member.invitedBy }}</b>
      </p>
      <br>
      <b-form-group
        label="Notes:"
        label-for="notes"
      >
        <b-form-textarea
          id="notes"
          v-model="member.notes"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <p class="small">
        <b-icon-info-circle></b-icon-info-circle>
        Notes are only visible to the CM of this community.
      </p>
      <br>
      <b-form-group
        label="Current Morphic Bar:"
        label-for="morphic-bar"
      >
        <MorphicBarPreview :options="member.currentMorphicBar.options" />
      </b-form-group>
      <b-row>
        <b-col md="6">
          <p class="small">
            <b-icon-info-circle></b-icon-info-circle>
            Show when the computer starts up.
          </p>
        </b-col>
        <b-col md="6">
          <div class="text-right">
            <b-button v-b-modal.sendConfirm size="sm" variant="success">Edit</b-button>
          </div>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col md="6">
          <b-button to="/dashboard/full" variant="primary">Save Changes</b-button>
          <b-button to="/dashboard/full" variant="outline-secondary" class="ml-1">Cancel</b-button>
        </b-col>
        <b-col md="6">
          <p class="text-right small">
            <b class="text-danger">DEBUG:</b>
            Notes: <b>{{ member.notes }}</b>;
            MorphicBar: <b>{{ member.currentMorphicBar.id }}</b>
          </p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import MorphicBarPreview from '@/components/dashboard/MorphicBarPreview'

export default {
  name: 'MemberEditor',
  components: {
    MorphicBarPreview
  },
  methods: {
    gotoEditor(bvModalEvt) {
      this.$router.push('/dashboard/morphicbar-editor/' + this.member.currentMorphicBar.id)
    }
  },
  data() {
    return {
      member: {
        name: "John Smith",
        email: "john.smith@gmail.com",
        joined: "2020-07-09",
        lastUsed: "2 hours ago",
        invitedBy: "Jack Sparrow (CM)",
        notes: "Example notes for this member...",
        currentMorphicBar: {
          id: 1,
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"]
        }
      }
    }
  }
}
</script>