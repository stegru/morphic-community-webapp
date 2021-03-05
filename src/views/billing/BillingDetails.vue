<template>
  <b-container>
    <h1>Billing Information</h1>

    <dl v-if="loaded">
      <dt>Payment Card on file</dt>
      <dd>
        <ul class="list-unstyled">
          <li >
            Card:
            <span v-if="billingInfo && billingInfo.card">{{billingInfo.card.last4}}</span>
            <span v-else>None</span>
          </li>
        </ul>
      </dd>

      <dt>Next billing date</dt>
      <dd>
        <ul v-if="plan && billingInfo" class="list-unstyled">
          <li>
            {{plan.price_text}} {{ plan.months === 1 ? "per month" : `every ${plan.months} months` }}
          </li>
          <li>{{plan.name}} ({{plan.member_limit}} members)</li>
        </ul>

        <b-button :to="{ name: 'Plans' }" variant="primary">Change Plan</b-button>
      </dd>
    </dl>

  </b-container>
</template>

<script>

import * as communityService from "@/services/communityService";
import * as billingService from "@/services/billingService";
import * as billing from "@/utils/billing";

export default {
    name: "BillingDetails",

    data() {
        return {
            /** @type {Boolean} */
            loaded: false,
            /** @type {Community} */
            community: null,
            /** @type {BillingInfo} */
            billingInfo: null,
            /** @type {BillingPlan} */
            plan: null
        };
    },
    mounted() {
        Promise.all([
            this.loadCommunity(),
            this.loadBilling()
        ]).then(() => {
            this.loaded = true;
        });
    },
    methods: {
        /**
         * Loads the community details.
         * @return {Promise} Resolves when complete.
         */
        loadCommunity: function () {
            return communityService.getCommunity(this.communityId).then((community) => {
                this.community = community.data;
            });
        },

        /**
         * Loads the community plan and billing details.
         * @return {Promise} Resolves when complete.
         */
        loadBilling: function () {
            let plans;
            return Promise.all([
                billing.getPlans().then(p => {
                    plans = p;
                }),
                billingService.getBillingInfo(this.communityId).then((r) => {
                    this.billingInfo = r.data;
                })
            ]).then(() => {
                this.plan = (this.billingInfo && this.billingInfo.plan_id && plans)
                    ? plans[this.billingInfo.plan_id]
                    : null;
            });
        }
    }
};
</script>
