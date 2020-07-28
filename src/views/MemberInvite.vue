<template>
  <div>
    <b-modal id="inviteConfirm" @ok="addMember(true)" title="Sending the Invite" footer-bg-variant="light" ok-title="Send Invite">
      <p class="my-4">Please confirm this member invitation?</p>
    </b-modal>
    <b-modal id="memberConfirm" @ok="addMember(false)" title="Adding the Member" footer-bg-variant="light" ok-title="Add Member">
      <p class="my-4">Please confirm adding this member?</p>
    </b-modal>

    <div class="bg-silver rounded p-3">
      <h4 class="mb-3">Member Invite</h4>
      <b-card no-body>
        <b-tabs v-model="tabIndex" card>
          <b-tab title="Step 1: Personal Information">
            <b-card-text>
              <h4 class="mb-3">Who do you want to invite?</h4>
              <b-form @submit.stop.prevent="onSubmit">
                <b-form-group
                  id="first-name"
                  label="First Name"
                  label-for="firstName"
                >
                  <b-form-input
                    v-model="$v.firstName.$model"
                    :state="validateState('firstName')"
                    id="firstName"
                    placeholder="First Name"
                  >
                  </b-form-input>
                <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="last-name"
                  label="Last Name"
                  label-for="lastName"
                >
                  <b-form-input
                    v-model="$v.lastName.$model"
                    :state="validateState('lastName')"
                    id="lastName"
                    placeholder="Last Name"
                    >
                  </b-form-input>
                <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  id="member-email"
                  label="Email"
                  label-for="memberEmail"
                >
                  <b-form-input
                    v-model="$v.memberEmail.$model"
                    :state="validateState('memberEmail')"
                    type="email"
                    id="memberEmail"
                    placeholder="Email Address"
                  >
                  </b-form-input>
                <b-form-invalid-feedback>This is a required field and must be a valid email address.</b-form-invalid-feedback>
                </b-form-group>
                <hr>
                <b-row>
                  <b-col md="6">
                    <b-button type="submit" variant="primary">Next</b-button>
                  </b-col>
                  <b-col md="6">
                    <div class="small text-right">
                      <b-link to="/learn/member-dont-have-email">Person does not have email</b-link>
                      <b-button to="/dashboard" size="sm" variant="outline-secondary" class="ml-2">Cancel</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-form>
            </b-card-text>
          </b-tab>
          <b-tab :disabled="this.$v.$invalid" title="Step 2: Attach Morphic Bar">
            <b-card-text>
              <h4 class="mb-3">Which Morphic Bar should this person use?</h4>
              <div v-for="bar in bars" :key="bar.id">
                <div class="barPicker bg-silver rounded p-3 mb-3" :class="{ active: selectedBar == bar.id }">
                  <h5><b>{{ bar.name }}</b></h5>
                  <b-row>
                    <b-col md="9">
                      <RenderList :barId="bar.id" />
                    </b-col>
                    <b-col md="3">
                      <div class="text-right">
                        <b-button size="sm" variant="light" class="btn-block">Preview</b-button>
                        <b-button @click="selectedBar = bar.id" variant="primary" size="sm" class="btn-block mt-1">Pick this Morphic Bar</b-button>
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
          <b-tab :disabled="this.$v.$invalid" title="Step 3: Preview and Send">
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
                <RenderList v-if="tabIndex === 2" :barId="selectedBar" />
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
              </b-row>
              <hr>
              <b-row>
                <b-col md="6">
                  <b-button @click="tabIndex = 1" variant="success">Back</b-button>
                  <b-button v-b-modal.memberConfirm variant="primary" class="ml-1">Add member</b-button>
                  <b-button v-b-modal.inviteConfirm variant="primary" class="ml-1">Add member & Send email invitation</b-button>
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
import { addCommunityMember, getCommunityBars, inviteCommunityMember, updateCommunityMember } from '@/services/communityService'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { availableItems } from '@/utils/constants'

export default {
  name: 'MemberInvite',
  mixins: [validationMixin],
  components: {
    RenderList
  },
  data () {
    return {
      bars: {},
      tabIndex: 0,
      firstName: '',
      lastName: '',
      memberEmail: '',
      selectedBar: null,
      sendEmailCopy: 0,
      availableItems: availableItems
    }
  },
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    memberEmail: {
      required,
      email
    }
  },
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v[name]
      return $dirty ? !$error : null
    },
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$anyError) {
        return
      }
      this.tabIndex = 1
    },
    addMember (invite) {
      let member = {
        first_name: this.firstName,
        last_name: this.lastName
      }
      addCommunityMember(this.communityId, member)
        .then(resp => {
          member = {
            member_id: resp.data.member.id,
            email: this.memberEmail
          }
          if (resp.status === 200) {
            if (invite) {
              inviteCommunityMember(this.communityId, member)
            }
            setTimeout(() => {
              this.attachBar(resp.data.member)
            }, 500)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    attachBar (resp) {
      const member = {
        first_name: resp.first_name,
        last_name: resp.last_name,
        bar_id: this.selectedBar,
        role: resp.role
      }
      updateCommunityMember(this.communityId, resp.id, member)
        .then(resp => {
          this.$router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    getCommunityBars(this.communityId)
      .then(resp => {
        this.bars = resp.data.bars
        // default selected bar
        this.selectedBar = this.bars[0].id
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
