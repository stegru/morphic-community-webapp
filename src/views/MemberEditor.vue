<template>
  <div>
    <b-modal id="goToEditorConfirm" @ok="gotoEditor" title="Go to editor" footer-bg-variant="light" ok-title="Go">
      <p class="my-4">If you leave the member details all of your changes will be lost. Are you sure you want to go now?</p>
    </b-modal>
    <b-modal id="saveConfirm" @ok="editMember" title="Save changes" footer-bg-variant="light" ok-title="Save">
      <p class="my-4">Are you sure you want to save changes?</p>
    </b-modal>
    <div class="bg-silver rounded p-3">
      <b-alert variant="success" :show="successAlert">
        {{ successMessage }}
      </b-alert>
      <h4 class="mb-3">Member Details</h4>
      <h5>{{ member.first_name }} {{ member.last_name }}</h5>
      <b-link v-if="member.email" :href="'mailto:'+member.email">{{ member.email }}</b-link>
      <hr>
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group
          id="first-name"
          label="First Name"
          label-for="first_name"
        >
          <b-form-input
            v-model="$v.member.first_name.$model"
            :state="validateState('first_name')"
            id="first_name"
            placeholder="First Name"
          >
          </b-form-input>
          <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="last-name"
          label="Last Name"
          label-for="last_name"
        >
          <b-form-input
            v-model="$v.member.last_name.$model"
            :state="validateState('last_name')"
            id="last_name"
            placeholder="Last Name"
            >
          </b-form-input>
          <b-form-invalid-feedback>This is a required field.</b-form-invalid-feedback>
        </b-form-group>
        <br>
  <!--       <b-form-group
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
        <br> -->
        <b-form-group
          label="Current Morphic Bar:"
          label-for="morphic-bar"
        >
          <RenderList v-if="currentMorphicBar" :barId="currentMorphicBar" class="bg-white p-3" />
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
              <b-button v-b-modal.goToEditorConfirm size="sm" variant="success">Edit</b-button>
            </div>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col md="6">
            <b-button v-b-modal.saveConfirm variant="primary">Save Changes</b-button>
            <b-button to="/dashboard" variant="outline-secondary" class="ml-1">Cancel</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>

import RenderList from '@/components/dashboard/RenderList'
import { getCommunityMember, updateCommunityMember, getCommunityBar } from '@/services/communityService'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { MESSAGES } from '@/utils/constants'

export default {
  name: 'MemberEditor',
  mixins: [validationMixin],
  components: {
    RenderList
  },
  data () {
    return {
      // availableItems: availableItems,
      currentMorphicBar: '',
      memberId: '',
      successAlert: false,
      successMessage: MESSAGES.successfulSave,
      member: {
        first_name: '',
        last_name: ''
      }
    }
  },
  validations: {
    member: {
      first_name: {
        required
      },
      last_name: {
        required
      }
    }
  },
  methods: {
    validateState (name) {
      const { $dirty, $error } = this.$v.member[name]
      return $dirty ? !$error : null
    },
    gotoEditor (bvModalEvt) {
      this.$router.push('/dashboard/morphicbar-editor/' + this.currentMorphicBar)
    },
    editMember () {
      updateCommunityMember(this.communityId, this.member.id, this.member)
        .then((resp) => {
          if (resp.status === 200) {
            this.successAlert = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMemberBar () {
      getCommunityBar(this.communityId, this.member.bar_id)
        .then((resp) => {
          this.currentMorphicBar = resp.data.id
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
    if (this.$route.params) {
      this.memberId = this.$route.params.memberId

      getCommunityMember(this.communityId, this.memberId)
        .then((resp) => {
          this.member = resp.data
          this.getMemberBar()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
