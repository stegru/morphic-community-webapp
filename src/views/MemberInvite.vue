<template>
  <div>
    <b-modal id="sendConfirm" @ok="sendConfirmFunc" title="Sending the Invite" footer-bg-variant="light" ok-title="Send Invite">
      <p class="my-4">Please confirm this member invitation?</p>
    </b-modal>
    <b-modal id="addMember" @ok="addMember" title="Adding the Member" footer-bg-variant="light" ok-title="Add Member">
      <p class="my-4">Please confirm adding this member?</p>
    </b-modal>

    <div class="bg-silver rounded p-3">
      <h4 class="mb-3">Member Invite</h4>
      <b-card no-body>
        <b-tabs v-model="tabIndex" card>
          <b-tab title="Step 1: Personal Information">
            <b-card-text>
              <h4 class="mb-3">Who do you want to invite?</h4>
              <b-form-group
                id="first-name"
                label="First Name"
                label-for="firstName"
              >
                <b-form-input v-model="firstName" id="firstName" placeholder="First Name"></b-form-input>
              </b-form-group>
              <b-form-group
                id="last-name"
                label="Last Name"
                label-for="lastName"
              >
                <b-form-input v-model="lastName" id="lastName" placeholder="Last Name"></b-form-input>
              </b-form-group>
              <b-form-group
                id="member-email"
                label="Email"
                label-for="memberEmail"
              >
                <b-form-input v-model="memberEmail" type="email" id="memberEmail" placeholder="Email Address"></b-form-input>
              </b-form-group>
              <hr>
              <b-row>
                <b-col md="6">
                  <b-button @click="tabIndex = 1" variant="primary">Next</b-button>
                </b-col>
                <b-col md="6">
                  <div class="small text-right">
                    <b-link to="/learn/member-dont-have-email">Person does not have email</b-link>
                    <b-button to="/dashboard" size="sm" variant="outline-secondary" class="ml-2">Cancel</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card-text>
          </b-tab>
          <b-tab title="Step 2: Attach Morphic Bar">
            <b-card-text>
              <h4 class="mb-3">Which Morphic Bar should this person use?</h4>
              <div v-for="bar in bars" :key="bar.id">
                <div class="barPicker bg-silver rounded p-3 mb-3" :class="{ active: memberBar == bar.id }">
                  <h5><b>{{ bar.name }}</b></h5>
                  <b-row>
                    <b-col md="9">
                      <RenderList :items="bar.items" />
                    </b-col>
                    <b-col md="3">
                      <div class="text-right">
                        <b-button size="sm" variant="light" class="btn-block">Preview</b-button>
                        <b-button @click="memberBar = bar.id" variant="primary" size="sm" class="btn-block mt-1">Pick this Morphic Bar</b-button>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <hr>
              <b-row>
                <b-col md="6">
                  <b-button @click="tabIndex = 0" variant="success">Back</b-button>
                  <b-button @click="tabIndex = 2" variant="primary" class="ml-1">Next</b-button>
                </b-col>
                <b-col md="6">
                  <div class="small text-right">
                    <b-button to="/dashboard" size="sm" variant="outline-secondary" class="ml-2">Cancel</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card-text>
          </b-tab>
          <b-tab title="Step 3: Preview and Send">
            <b-card-text>
              <h4 class="mb-3">Does this looks alright?</h4>
              <p>
                First Name:
                <b>{{ firstName }}</b>
              </p>
              <p>
                Last Name:
                <b>{{ lastName }}</b>
              </p>
              <p>
                Email:
                <b>{{ memberEmail }}</b>
              </p>
              <div class="bg-silver rounded p-3 mb-3">
                <RenderList :items="getBarItemsById(memberBar)" />
              </div>
              <b-row>
                <b-col md="6">
                  <b-form-checkbox
                    id="send-me-copy"
                    v-model="sendEmailCopy"
                    name="send-me-copy"
                    value="1"
                    unchecked-value="0"
                  >
                    Send me a copy of the invitation email
                  </b-form-checkbox>
                </b-col>
                <b-col md="6">
                  <p class="text-right small">
                    <b class="text-danger">DEBUG:</b>
                    First Name: <b>{{ firstName }}</b>;
                    Last Name: <b>{{ lastName }}</b>;
                    Email: <b>{{ memberEmail }}</b>;
                    MorphicBar: <b>{{ memberBar }}</b>;
                    Copy: <b>{{ sendEmailCopy }}</b>
                  </p>
                </b-col>
              </b-row>
              <hr>
              <b-row>
                <b-col md="6">
                  <b-button @click="tabIndex = 1" variant="success">Back</b-button>
                  <b-button v-b-modal.sendConfirm variant="primary" class="ml-1">Send email invitation</b-button>
                  <b-button v-b-modal.addMember variant="primary" class="ml-1">Add member</b-button>
                </b-col>
                <b-col md="6">
                  <div class="small text-right">
                    <b-button to="/dashboard" size="sm" variant="outline-secondary" class="ml-2">Cancel</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<style>
  .morphicBarPreview {
    border: 1px solid silver;
  }

  .barPicker.active {
    background: #eee;
    border: 1px solid navy;
  }
</style>

<script>

import RenderList from '@/components/dashboard/RenderList'
import { addCommunityMember } from '@/services/communityService'
import { availableItems } from '@/utils/constants'

export default {
  name: 'MemberInvite',
  data () {
    return {
      tabIndex: 0,
      firstName: '',
      lastName: '',
      memberEmail: '',
      memberBar: 1,
      sendEmailCopy: 0,
      availableItems: availableItems
    }
  },
  components: {
    RenderList
  },
  methods: {
    sendConfirmFunc (bvModalEvt) {
      this.$router.push('/dashboard')
    },
    addMember (bvModalEvt) {
      console.log(bvModalEvt)
      const member = {
        first_name: this.firstName,
        last_name: this.lastName
      }
      addCommunityMember(this.communityId, member)
        .then(resp => {
          if (resp.status === 200) {
            this.$router.push('/dashboard')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBarItemsById (barId) {
      if (barId > 0 && this.bars) {
        for (var i = this.bars.length - 1; i >= 0; i--) {
          if (this.bars[i].id === barId) {
            return this.bars[i].items
          }
        }
      }
      return []
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    bars () {
      return [
        {
          id: 1,
          name: "Basic MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          is_shared: true,
          items: this.availableItems
        },
        {
          id: 2,
          name: "Magnifier and Text Zoom MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          is_shared: true,
          items: this.availableItems
        },
        {
          id: 3,
          name: "High Contrast & Text Zoom MorphicBar",
          desc: "This Morphic Bar is designed to match your needs when using it as...",
          is_shared: true,
          items: this.availableItems
        }
      ]
    }
  }
}
</script>
