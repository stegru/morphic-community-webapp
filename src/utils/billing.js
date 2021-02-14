import * as billingService from "@/services/billingService";

/**
 * Collection of billing plans, with the key being the plan ID.
 * @typedef {Object<String,BillingPlan>} BillingPlans
 */

/**
 * Billing plan
 * @typedef {Object} BillingPlan
 * @property {Number} id The plan's unique ID.
 * @property {Number} member_limit The number of members allowed under the plan.
 * @property {Number} months The number of months in the plan's billing cycle.
 * @property {Number} price The price in the currency's smallest denomination (e.g., cent for USD).
 * @property {Number} currency The currency of the price.
 *
 * @property {String} name The name of the plan.
 */

/**
 * Billing information
 * @typedef {Object} BillingInfo
 * @property {String} plan_id The community plan.
 * @property {Number} trial_end UNIX timestamp representing the end of the trial period.
 * @property {PaymentStatus} status Payment status.
 * @property {String} contact_member_id The ID of the member who is the billing contact.
 * @property {BillingCard} card The payment card.
 */

/**
 * @typedef {"paid"|"past_due"|"canceled"|"closed"} PaymentStatus
 */

/**
 * @typedef {Object} BillingCard Partial details of a payment card.
 * @property {String} brand The brand of the card.
 * @property {String} last4 The last four digits of the card.
 */


export const PaymentStatus = {
    paid: {
        text: "All payments have been made (or still in trial)"
    },
    past_due: {
        text: "Payments have failed, but retries have not been exhausted"
    },
    canceled: {
        text: "User canceled their account, but it won't close until the end of the billing cycle"
    },
    closed: {
        text: "Account is closed due to user request or lack of payment"
    }
};


/**
 * @type {BillingPlans}
 */
var allPlans;

const planNames = {
    "basic-1-month": "Standard Monthly",
    "basic-6-month": "Standard Plan",
    "midsize-1-month": "Medium Monthly",
    "midsize-6-month": "Medium Plan",
    "large-1-month": "Large Monthly",
    "large-6-month": "Large Plan",
    "enterprise-1": "Enterprise"
};

/**
 * Gets all available plans.
 * @return {Promise<BillingPlans>} Resolves with the available plans.
 */
export function getPlans() {
    var togo;
    if (allPlans) {
        togo = Promise.resolve(allPlans);
    } else {
        togo = billingService.getCommunityPlans().then(result => {
            allPlans = {};

            result.data.plans.forEach(plan => {
                allPlans[plan.id] = plan;
                plan.name = planNames[plan.id];
            });

            return allPlans;
        });
    }

    return togo;
}
