<template>

  <div>
    <h1>Members using this bar</h1>

    <ul>
        <li v-for="member in members" :key="member.id">
            <b-link :to="{ name: 'Focused: Member', query: { barId: barDetails.id, memberId: member.id } }">
                {{ member.first_name }} {{ member.last_name }}
            </b-link>
        </li>
    </ul>

    <b-link :to="{path: '/focused/bar-editor', query: { barId: barDetails.id}}">Go back</b-link>
  </div>
</template>

<style lang="scss">

</style>

<script>

import { getCommunityBars, getCommunity, getCommunityBar, getCommunityMembers, getCommunityMember } from "@/services/communityService";

export default {
    name: "MemberInvite",
    components: {
    },
    methods: {
        loadBarMembers: function () {
            getCommunityBars(this.communityId)
                .then(resp => {
                    const barsData = resp.data.bars;
                    getCommunityMembers(this.communityId)
                        .then((resp) => {
                            this.barsList = barsData;
                            this.membersList = resp.data.members;
                            if (resp.data.members.length > 0) {
                                for (let i = 0; i < resp.data.members.length; i++) {
                                    if (this.$route.query.barId === resp.data.members[i].bar_id) {
                                        this.members.push(resp.data.members[i]);
                                    }
                                }
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                })
                .catch(err => {
                    console.error(err);
                });
        },
        loadMemberData: function () {
            getCommunityMember(this.communityId, this.$route.query.memberId)
                .then((resp) => {
                    this.memberDetails = resp.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        getCommunityData: function () {
            getCommunity(this.communityId)
                .then((community) => {
                    this.community = community.data;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    computed: {
        communityId: function () { return this.$store.getters.communityId; }
    },
    mounted() {
        getCommunityBar(this.communityId, this.$route.query.barId)
            .then(resp => {
                this.barDetails = resp.data;
            })
            .catch(err => {
                console.error(err);
            });

        if (this.$route.query.memberId) {
            this.loadMemberData();
        }
        this.loadBarMembers();
        this.getCommunityData();
    },
    watch: {
        "$route.query": function () {
            this.initialChangesPrimaryItems = false;
            this.initialChangesDrawerItems = false;
            if (this.$route.query.memberId) {
                this.loadMemberData();
            }
            getCommunityBar(this.communityId, this.$route.query.barId)
                .then(resp => {
                    this.barDetails = resp.data;
                    this.members = [];
                    this.loadBarMembers();
                    this.getCommunityData();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    data() {
        return {
            // data for the community manager
            community: {},
            barsList: [],
            membersList: [],

            barDetails: {},
            members: [],
            memberDetails: {}
        };
    }
};
</script>
