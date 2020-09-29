<template>
  <div>
    <!-- MODALs: BEGIN -->
    <b-modal id="modalEditGeneric" @ok="refreshButton(true)" @cancel="refreshButton(false)" scrollable centered footer-bg-variant="light" ok-title="Update Button" size="lg">
      <div v-if="buttonEditStorage">
        <b-row>
          <b-col md="6">
            <h5><b>{{ buttonEditStorage.configuration.label }}</b></h5>
            <p>What text do you want on the button?</p>
            <div role="group" class="mb-3">
              <label for="modalEditGenericLabel">Text on the button</label>
              <b-form-input id="modalEditGenericLabel" v-model="buttonEditStorage.configuration.label" placeholder="Button text" maxLength="35" />
            </div>
            <div class="bg-silver rounded p-3">
              <p v-if="editDialogDetails" class="text-right small mb-0">
                (<b-link @click="editDialogDetails = false">Hide</b-link>)
              </p>
              <p v-else class="small">
                Optional: <b-link @click="editDialogDetails = true">Customize the button (color &amp; picture)</b-link>
              </p>
              <div v-if="editDialogDetails">
                <h6><b>Color for button</b></h6>
                <div class="bg-white rounded p-3 mb-4">
                  <div
                    v-for="(hex, name) in colors"
                    :key="name"
                    @click="editChangeColor(hex)"
                    :title="name"
                    :class="{ active: (buttonEditStorage.configuration.color || colors.blue) === hex }"
                    class="colorBoxHolder"
                    >
                    <div :style="'background-color: ' + hex + ';'" class="colorBox"></div>
                  </div>
                </div>

                <h6><b>Picture for button</b></h6>
                <div v-if="buttonEditStorage.configuration.subkind && editSubKindIcons && editDialogSubkindIcons" class="bg-white rounded p-3">
                  <div
                    v-for="(filename, icon) in editSubKindIcons"
                    :key="icon"
                    @click="editChangeIcon(icon)"
                    :class="{ active: buttonEditStorage.configuration.image_url === icon }"
                    class="iconBoxHolder"
                    >
                    <div :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" class="iconBox">
                      <b-img :src="'/icons/' + filename" :style="'color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" />
                    </div>
                  </div>
                </div>
                <div v-else class="bg-white rounded p-3 compactIconHolder">
                  <div class="iconBoxHolder" :class="{ active: (!buttonEditStorage.configuration.image_url) }">
                    <div
                      @click="editChangeIcon('')"
                      :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'"
                      class="iconBox"
                      >
                      <p>No image</p>
                    </div>
                  </div>
                  <div
                    v-for="(filename, icon) in icons"
                    :key="icon"
                    @click="editChangeIcon(icon)"
                    :class="{ active: buttonEditStorage.configuration.image_url === icon }"
                    class="iconBoxHolder"
                    >
                    <div :style="'border-color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" class="iconBox">
                      <b-img :src="'/icons/' + filename" :style="'color: ' + (buttonEditStorage.configuration.color || colors.blue) + ';'" />
                    </div>
                  </div>
                </div>
                <div v-if="buttonEditStorage.configuration.subkind && editSubKindIcons && editDialogSubkindIcons" class="text-center pt-2">
                  <b-button @click="editDialogSubkindIcons = false" variant="outline-dark" size="sm">Pick from more pictures</b-button>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="max-height bg-silver rounded p-3 text-center">
              <p class="text-right small"><b-link @click="buttonToRemove(buttonEditStorage)" class="text-danger">Remove Button</b-link></p>
              <p class="">This is the button you are making</p>
              <div class="barPreview rounded">
                <div class="previewHolder">
                  <PreviewItem :item="buttonEditStorage" />
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <b-modal id="roleChangeConfirm" @ok="changeMemberRole" title="Change Member Role" footer-bg-variant="light" ok-title="Change Role">
      <p class="my-4">Please confirm this role change?</p>
    </b-modal>
        <b-modal id="deleteConfirm" @ok="deleteMember" title="Delete Member" footer-bg-variant="light" ok-title="Delete">
      <p class="my-4">Please confirm the deletion of this member?</p>
    </b-modal>
    <b-modal id="barDeleteConfirm" @ok="deleteBar" title="Delete Bar" footer-bg-variant="light" ok-title="Delete">
      <p class="my-4">Please confirm the deletion of this bar?</p>
    </b-modal>
    <b-modal id="sendEmailInvitationModal" :ok-disabled="!invitationEmail.match('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')" @ok="sendInvite" title="Enter email address for invitation" footer-bg-variant="light" ok-title="Send Invitation">
      <p class="my-4"></p>
      <b-form-group :label="'Please enter email address for '+this.memberDetails.first_name+' '+this.memberDetails.last_name" label-for="email">
        <b-form-input v-model="invitationEmail" id="email" placeholder="myemail@mail.com" class="mb-2"></b-form-input>
      </b-form-group>
    </b-modal>
    <!-- MODALs: END -->

    <!-- EDITOR v2 -->
    <b-row>
      <b-col md="2">
        <CommunityManager :community="community" :bars="barsList" :members="membersList" :activeMemberId="activeMemberId" :activeBarId="activeMemberId ? null : barDetails.id" />
      </b-col>
      <b-col md="8">
        <div id="barEditor" class="pt-2">
          <b-alert variant="success" :show="successAlert">
            <span>{{ successMessage }}</span>
          </b-alert>
          <!-- Topmost area above desktop image -->
          <div id="bar-info">
            <div class="bar-name">
              <h3 v-if="activeMemberId" class="mb-0">
                <b>Bar for {{ memberDetails.first_name }} {{memberDetails.last_name}}</b>&nbsp;
              </h3>
              <b-form-group v-else-if="newBar" label="Bar Name" label-for="barName">
                <b-form-input v-model="barDetails.name" id="barName" placeholder="Enter new bar name" class="mb-2"></b-form-input>
              </b-form-group>
              <h3 v-else class="mb-0">
                <b>{{ barDetails.name === 'Default' ? 'Default Bar' : barDetails.name }}</b>&nbsp;
                <span v-if="barDetails.name !== 'Default'" class="small">(<b-link @click="editBarName = !editBarName">Edit Bar name</b-link>)</span>
              </h3>
              <b-form-group v-if="!activeMemberId && editBarName" label-for="barName">
                <br/>
                <b-form-input @input="isChanged = true" v-model="barDetails.name" id="barName" placeholder="Edit bar name" class="mb-2"></b-form-input>
              </b-form-group>
            </div>
            <div class="save-button-area">
              <b-button v-if="isChanged && !newBar" @click="revertBar" variant='warning' class="revertButton" size="sm">Revert to last saved</b-button>
              <b-button v-if="activeMemberId" @click="addPersonalBar" :variant="isChanged ? 'success' : 'outline-dark'" class="addButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Save to member's MorphicBar</b-button>
              <b-button v-else-if="newBar" @click="addBar" :variant="isChanged ? 'success' : 'outline-dark'" class="updateButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Add new bar</b-button>
              <b-button v-else @click="saveBar" :variant="isChanged ? 'success' : 'outline-dark'" class="updateButton" size="sm"><b-icon-arrow-clockwise></b-icon-arrow-clockwise> Save this to Community Bar</b-button>
            </div>
          </div>

          <!-- Secondary area above desktop image -->
          <div id="secondary-bar-info">
            <b-nav id="editorNav" tabs class="small">
              <b-nav-item :active="tab === 1" @click="tab = 1"><b-icon-person-circle></b-icon-person-circle>
                <span v-if="activeMemberId">
                  Member Details
                </span>
                <span v-else-if="getMembersCount() === 0">
                  Unused Bar
                </span>
                <span v-else>
                  Members ({{ getMembersCount() }})
                </span>
              </b-nav-item>
              <b-nav-item disabled :active="tab === 2" @click="tab = 2"><b-icon-gear-fill></b-icon-gear-fill> Bar Settings</b-nav-item>
              <span v-if="getBarRemoveValidity()">
                <b-nav-item v-b-modal.barDeleteConfirm id="removeBar">Remove Bar</b-nav-item>
              </span>
            </b-nav>
            <div class="barSelectorArea">
              <div v-if="activeMemberId">
                <b-form-select v-model="barSelectedInDropdown">
                  <b-form-select-option value="customized" v-if="isChanged || barDetails.is_shared == false">Customized</b-form-select-option>
                  <b-form-select-option v-for="bar in availableBars" :key="bar.id" :value="bar.id">{{bar.name}}</b-form-select-option>
                </b-form-select>
                <b-button class="changeButton" variant="success" :disabled="memberDetails.bar_id == barSelectedInDropdown || barSelectedInDropdown == 'customized'" @click="changeUserBarToCommunityBar">Change</b-button>

              </div>
            </div>
            <div class="userInvitationStatusArea">
              <span v-if="activeMemberId && memberDetails.state === 'active'">
                <span class="green dot"></span>
                <span class="text">active</span>
              </span>
              <span v-else-if="activeMemberId && memberDetails.state === 'uninvited'" @click="getEmailAndSendInvite()">
                <span class="red dot"></span>
                <button class="linkStyling">Invite member</button>
              </span>
              <span v-else-if="activeMemberId && memberDetails.state === 'invited'" @click="getEmailAndSendInvite()">
                <span class="yellow dot"></span>
                <button class="linkStyling">Re-invite member</button>
              </span>
            </div>
          </div>

          <div v-if="tab === 1" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <div v-if="activeMemberId">
              <h5><b-icon-person-circle></b-icon-person-circle> <b>{{ memberDetails.first_name }}</b></h5>
              <ul class="list-unstyled small">
                <li v-if="memberDetails.role === 'member'"><b-link v-b-modal.roleChangeConfirm>Make member a Community Manager</b-link></li>
                <li v-else><b-link v-b-modal.roleChangeConfirm>Remove community manager role from member</b-link></li>
                <li><b-link v-b-modal.deleteConfirm class="text-danger">Delete member</b-link></li>
                <li v-if="memberDetails.state === 'uninvited'" @click="getEmailAndSendInvite()"><b-link>Send Invitation</b-link></li>
              </ul>
            </div>
            <div v-else-if="getMembersCount() === 0">
              <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is NOT used</b></h5>
              <p class="mb-0">You can go back to the <b-link to="/dashboard">Dashboard</b-link> and invite members to use it.</p>
            </div>
            <div v-else>
              <h5><b-icon-person-circle></b-icon-person-circle> <b>This Morphic Bar is used by {{ getMembersCount() }} members</b></h5>
              <ul class="small mb-0">
                <li v-for="member in members" v-bind:key="member.id">
                  <p>{{ member.first_name }} {{ member.last_name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div v-else-if="tab === 2" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <h5><b-icon-gear-fill></b-icon-gear-fill> <b>Morphic Bar settings</b></h5>
            <b-form-checkbox id="barOnRight" v-model="bar.settings.barOnRight" name="barOnRight" value="true" unchecked-value="false">
              Bar on the right of the screen
            </b-form-checkbox>
            <b-form-checkbox id="cannotClose" v-model="bar.settings.cannotClose" name="cannotClose" value="true" unchecked-value="false">
              Member cannot close bar
            </b-form-checkbox>
            <b-form-checkbox id="startsOpen" v-model="bar.settings.startsOpen" name="startsOpen" value="true" unchecked-value="false">
              Morphic Bar always starts open
            </b-form-checkbox>
          </div>
          <div v-else-if="tab === 3" class="bg-light p-3">
            <button @click="tab = 0" type="button" aria-label="Close" class="close">×</button>
            <h5><b-icon-fullscreen></b-icon-fullscreen> <b>Try this bar on your own computer</b></h5>
            <p>
              You need to have Morphic installed on your computer to try out bars in your community.
              <b-link to="/learn/how-to-install">Learn how to set up your computer</b-link>.
            </p>
            <b-button variant="primary">Try this Morphic Bar on my computer</b-button>
          </div>
          <div id="preview-holder" class="desktop fill-height mt-3">
            <drop mode="cut" class="dragToDelete desktop-portion">
              <template v-slot:drag-image="">
                <img src="/img/trash.svg" style="height: 100px; width: 100px; margin-left: -50px; margin-top: -50px"/>
              </template>
              <div class="desktop-portion">
              </div>
            </drop>
            <!-- Buttons Bar -->
            <div id="preview-bar">
              <div class="barPreviewEditor" ref="myref">
                <drop-list :items="barDetails.items" :class="openDrawer && 'showDrawer'" class="buttonsList draggable-area" @insert="dropToBar" @reorder="$event.apply(barDetails.items)">
                  <template v-slot:item="{item}">
                    <drag :key="item.id"
                      @dragstart="setDragInProgress(true)"
                      @dragend="setDragInProgress(false)"
                      @click="buttonToEdit(item, $event)"
                      @cut="removeButton(item, barDetails.items)"
                      class="buttonDragger">
                      <div :key="item.id" class="previewHolder">
                        <PreviewItem :item="item" />
                      </div>
                    </drag>
                  </template>
                  <template v-slot:feedback="{data}">
                    <div class="item feedback button-feedback" :key="data.id"></div>
                  </template>
                </drop-list>
              </div>
              <div class="logoHolder">
                <b-img src="/img/logo-color.svg" />
              </div>
              <div class="openDrawerIconHolder">
                <b-link @click="openDrawer = !openDrawer">
                  <b-icon :icon="openDrawer ? 'arrow-right-circle-fill' : 'arrow-left-circle-fill'"></b-icon>
                </b-link>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <!-- Button Catalogue -->
      <b-col md="2">
        <drop class="cut" mode="cut">
          <template v-slot:drag-image="">
            <img src="/img/trash.svg" style="height: 100px; width: 100px; margin-left: -50px; margin-top: -50px"/>
          </template>
          <div id="buttonsPanel" class="fill-height bg-silver p-3">
            <b-input-group id="search-group" size="sm" class="mb-3">
              <b-form-input type="text" disabled></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" disabled><b-icon-search></b-icon-search></b-button>
              </b-input-group-append>
            </b-input-group>
            <ul class="buttonsCatalogListing linkList list-unstyled mb-0" style="overflow-y: scroll; max-height: 630px;">
              <li v-for="(buttonGroup, categoryName) in buttonCatalog" :key="categoryName" class="buttonsCatalogHeader">
                <h3>{{categoryName}}</h3>
                <ul class="ButtonsCatalogEntries">
                  <li v-for="(button, buttonId) in buttonGroup" :key="buttonId" class="buttonsCatalogEntry">
                    <!-- Render each button as draggable -->
                    <drag :data="button" type="catalogButtonNoImage">
                      <!-- Define looks when dragged -->
                      <template v-slot:drag-image>
                        <PreviewItem :item="button" :noImage="true" class="noImage" />
                      </template>
                      <!-- Define looks when selected (expanded) -->
                      <div v-if="buttonId == expandedCatalogButtonId" class="active" @click="expandedCatalogButtonId = undefined">
                        <div style="width: 100%; display: inline-flex;">
                          <b-img v-if="button.configuration.image_url && icons[button.configuration.image_url]" :src="'/icons/' + icons[button.configuration.image_url]" style="max-width: 1.25rem; max-height: 100%;"/>
                          <b-img v-else :src="'/icons/bootstrap.svg'" style="max-width: 1.25rem; max-height: 100%;"></b-img>
                          <h3 style="margin-block-start: inherit; text-decoration-line: underline; margin-left: 0.5rem; margin-bottom: 0.05rem;">{{button.configuration.label}}</h3>
                        </div>
                        <div class="description">{{button.configuration.description || "A button that enables the functionality described above"}}</div>
                        <div class="help">To add this button, drag, press enter, or click on a spot on the left</div>
                        <div class="buttons">
                          <drag :data="button" type="catalogButtonNoImage">
                            <PreviewItem :item="button" :simplified="true" :noImage="true" class="noImage" @addToBarFromPreview="dropToBar($event)" />
                          </drag>

                          <drag v-if="button.kind != 'action'" :data="button" type="catalogButtonWithImage">
                            <template v-slot:drag-image>
                              <PreviewItem :item="button" :noImage="false" class="noImage" />
                            </template>
                            <PreviewItem :item="button" :simplified="true" class="withImage" @addToBarFromPreview="dropToBar($event)" />
                          </drag>
                        </div>
                      </div>
                      <!-- Define looks when not selected -->
                      <b-link v-else @click="expandCatalogButton(button, buttonId)" :style="'color: ' + (button.configuration.color || colors.blue) + ';'" class="buttonsCatalogEntry nonExpandedCatalogEntry">
                        <b-img v-if="button.configuration.image_url && icons[button.configuration.image_url]" :src="'/icons/' + icons[button.configuration.image_url]" />
                        <b-icon v-else icon="bootstrap"></b-icon>
                        {{ button.configuration.label }}
                      </b-link>
                    </drag>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </drop>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
  $primary-color: #002957;
  $secondary-color: #84c661;

  #barEditor {
    #bar-info {
      display: flex;

      .bar-name {
        flex-grow: 1;
      }
    }
  }

  #secondary-bar-info {
    display: grid;
    grid-template-columns: 33% auto 33%;
    margin-top: 13px;

    #editorNav {
      position: relative;
      .addButton, .updateButton {
        position: absolute;
        right: 0;
        top: 6px;
      }
    }

    .barSelectorArea {
      select.custom-select {
        width: inherit;
      }
      button {
        margin-left: 11px;
      }
    }
    .userInvitationStatusArea {
      text-align: right;

      .dot {
        height: 13px;
        width: 13px;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;

        &.green { background-color: #3bc03b; }
        &.yellow { background-color: #f3c702; }
        &.red { background-color: #f20202; }
      }

      .linkStyling {
        border: none;
        background: inherit;
        color: #069;
        cursor: pointer;
      }
    }
  }
  #preview-holder {
    border: 1px solid #002957;

    .desktop-portion {
      flex-grow: 1;
    }

    #preview-bar, #preview-drawer {
      padding-top: 10px;
      padding-bottom: 5px;
      display: flex;
      min-height: 600px;
      flex-direction: column;
      background: white;
      border-left: 1px solid #002957;
      min-width: 120px;

      // vertical line separating bar from drawer
      background-image: linear-gradient(#000, #000);
      background-size: 1px 100%;
      background-repeat: no-repeat;
      background-position: right 120px bottom 0px;

      .minWidth1px {
        min-width: 1px;
      }

      .button-feedback, .feedback {
        background-color: #e5f4ed;
        border: 2px dashed rgb(16 141 74);
        height: 50px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 10px;
        margin-top: 10px;

        &.clickDropSpot {
          margin-top: 0px;
        }
      }

      .logoHolder {
        width: 100%;
        text-align: right;
        padding-right: 32px;
      }

      .barPreviewEditor { // WAS ALSO: , .barPreview
        // width: 120px;
        // display: flex;
        // flex-direction: column;
        // flex-grow: 1;
        // height: 500px;

        .buttonDragger {
          writing-mode: horizontal-tb;
          margin-top: 10px;
          margin-bottom: 0px;
          margin-left: 10px;
          margin-right: 10px;
        }

        .buttonsList {

          // display: block;
          overflow: hidden;
          height: 500px;
          min-width: 120px;
          display: inline-flex;
          writing-mode: vertical-rl;
          flex-wrap: wrap;

          // &.showDrawer {
          //   flex-wrap: wrap;
          // }

          &:not(.showDrawer) {
            // flex-wrap: wrap;
            width: 120px !important;
          }

          button {
            padding: 0px;
          }



          .draggable-area {
            // min-width: 500px;
            flex-grow: 1;
            list-style: none;


            .previewHolder {
              width: 120px;
              padding: 10px;
              padding-top: 5px;
              padding-bottom: 5px;
              position: relative;

              .overlay {
                position: absolute;
                top: 10px;
                color: $primary-color !important;
                background: rgba(255,255,255,0.7) !important;
                font-size: 1.5rem;
                cursor: pointer;
                &:hover {
                  background: white !important;
                }
                &:active, &:focus {
                  color: #d60000 !important;
                }
              }
            }
          }
        }
      }
    }
  }

  #buttonsPanel {
    .ButtonsCatalogEntries {
      padding-inline-start: 17px;
      list-style: none;
      .buttonsCatalogEntry {
        .active {
          background-color: #e0f1d7;
          border: solid 1px #008145;
          border-radius: 5px;
          padding: 10px;

          .buttons {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
          }

          h3 {
            margin-top: 15px;
            font-size: 20px;
            margin-bottom: 0px;
          }

          div.description {
            font-size: 14px;
          }

          div.help {
            font-size: 14px;
            font-weight: bold;
            margin-top: 15px;
            line-height: 18px;
          }
        }
      }
    }
  }

  .max-height {
    height: 100%;
  }
  #removeBar .nav-link {
    color: #dc3545 !important;
  }

  .compactIconHolder {
    height: 22rem;
    overflow-y: auto;
    .iconBoxHolder {
      margin-left: .5rem !important;
    }
  }

  .colorBoxHolder {
    display: inline-block;
    cursor: pointer;
    margin: 0 .25rem;
    width: 2.6rem;
    height: 2.6rem;
    .colorBox {
      width: 2rem;
      height: 2rem;
    }
  }

  .iconBoxHolder {
    display: inline-block;
    cursor: pointer;
    width: 5.25rem;
    height: 5.25rem;
    margin: .75rem 0 .75rem .75rem;
    .iconBox {
      background: white;
      border: 1px solid black;
      border-radius: 100%;
      padding: .75rem;
      width: 4.5rem;
      height: 4.5rem;
      text-align: center;
      img {
        width: 3rem;
        height: 3rem;
      }
      p {
        width: 3rem;
        height: 3rem;
        line-height: 100%;
        margin: 0;
      }
    }
  }

  .colorBoxHolder, .iconBoxHolder {
    padding: .3rem;
    &.active {
      padding: .1rem;
      border: .2rem solid green;
    }
  }

  #modalEditGeneric {
    padding: .5rem 1rem 0 0;
    border-bottom: none;
  }

  .text-disabled {
    color: gray;
    &:active, &:focus, &:hover {
      cursor: not-allowed;
      color: gray !important;
      text-decoration: none !important;
    }
  }

  .nonExpandedCatalogEntry {
    width: 100%;
    display: block;

    img {
      max-width: 1rem;
      height: 1rem;
    }

    .buttonsCatalogEntry {
      width: 100%;
      display: block;
    }
  }

  #preview-bar, #preview-drawer {
    .buttonsCatalogEntry {
      .active {
        background-color: none;
        border: 0px;
        width: default;

        .buttons {
          display: inherit !important;

          button.withImage {
            display: none;
          }

          display: flex;
          justify-content: space-around;
          align-items: flex-end;
        }

        h3, div.description, div.help {
          display: none;
        }
      }
    }
  }

</style>

<script>

import CommunityManager from '@/components/dashboardV2/CommunityManager'
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBars, deleteCommunityBar, getCommunity, inviteCommunityMember, getCommunityBar, updateCommunityBar, createCommunityBar, getCommunityMembers, getCommunityMember, updateCommunityMember, deleteCommunityMember } from '@/services/communityService'
import { buttonCatalog, colors, icons, subkindIcons, MESSAGES } from '@/utils/constants'
import { predefinedBars } from '@/utils/predefined'
import draggable from 'vuedraggable'
import { Drag, Drop, DropList, DropMask } from "vue-easy-dnd";

export default {
  name: 'MorphicBarEditor',
  components: {
    CommunityManager,
    PreviewItem,
    draggable,
    Drag,
    Drop,
    DropList,
    DropMask
  },
  methods: {
    dropToBar: function (event) {
      event.data = JSON.parse(JSON.stringify(event.data)); // ensure copy
      event.data.id = this.generateId(event.data)

      if (event.type == "catalogButtonNoImage") {
        event.data.configuration.image_url = "";
      }
      // insert in new position (default to 0)
      this.barDetails.items.splice(event.index || 0, 0, event.data);
      // close any expanded button
      this.expandedCatalogButtonId = undefined;
      this.setBarChanged();
      return true;
    },

    setBarChanged: function () {
      this.isChanged = true;
      this.barSelectedInDropdown = 'customized';
    },

    revertBar: function () {
      if (window.confirm("Are you sure you want reload last saved version of the bar? This means you will loose all unsaved changes!")) {
        this.isChanged = false;
        this.barDetails = JSON.parse(JSON.stringify(this.originalBarDetails));
        this.barSelectedInDropdown = this.barDetails.id;
      }
    },
    dropOnClickToAdd: function (event) {
      this.dropToBar(event);
    },
    changeUserBarToCommunityBar: function () {
      if (this.isChanged || this.barDetails.is_shared == false) {
        if (false == confirm("Warning! Changing to a different community bar will delete all MorphicBar customizations for this member.")) {
          return;
        }
      }

      // if we've made it to this point, either the the user was already using a community bar, or has accepted to loose customized data
      updateCommunityMember(this.community.id, this.memberDetails.id, {
        first_name: this.memberDetails.first_name,
        last_name: this.memberDetails.last_name,
        bar_id: this.barSelectedInDropdown,
        role: this.memberDetails.role
      }).then(r => {
        getCommunityBar(this.community.id, this.barSelectedInDropdown).then(newBarDetails => {
          this.barDetails = newBarDetails.data;
          this.isChanged = false;
          this.newBar = false;
          this.memberDetails.bar_id = this.barSelectedInDropdown;
          this.updateOriginalBarDetails();
        });
      });
    },
    // used to avoid bug where a "click" event is triggered at end of drag
    setDragInProgress: function (newValue) {
      this.dragInProgress = newValue;
    },

    removeButton: function (item, itemList) {
      let compareObjects = function (x, y) {
        for (let key in x) {
          if (x[key] != y[key]) {
            return false;
          } else {
            if (x[key] instanceof Object && y[key] instanceof Object) {
              if (compareObjects(x[key], y[key]) == false) {
                return false;
              }
            }
          }
        }
        return true;
      };
      let index = itemList.findIndex(x => compareObjects(x, item));
      itemList.splice(index, 1);
    },

    getEmailAndSendInvite() {
      this.invitationEmail = "";
      this.$bvModal.show('sendEmailInvitationModal');
    },
    sendInvite() {
      if (this.invitationEmail) {
        let communityId = this.$store.getters.communityId;
        inviteCommunityMember(communityId, this.memberDetails.id, this.invitationEmail);
        this.memberDetails.state = 'invited';
      }
    },

    loadAllData: function () {
      this.loadBarData()
      this.loadBarMembers()
      this.getCommunityData()

      if (this.activeMemberId) {
        this.loadMemberData()
      }
    },

    loadBarData: function () {
      if (this.$route.query.barId === 'new') {
        this.newBar = true
        this.barDetails = this.newBarDetails
      } else if (this.$route.query.barId.indexOf('predefined') !== -1) {
        for (let i = 0; i < this.predefinedBars.length; i++) {
          if (this.predefinedBars[i].id === this.$route.query.barId) {
            this.newBar = true
            this.barDetails = this.newBarDetails
            this.barDetails.items = this.predefinedBars[i].items;
          }
        }
      } else {
        getCommunityBar(this.communityId, this.$route.query.barId)
          .then(resp => {
            this.barDetails = resp.data
            this.originalBarDetails = JSON.parse(JSON.stringify(this.barDetails));
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    addIds: function (items) {
      return items.map(item => item.id = this.generateId(item));
    },
    // hack to refresh css rendering due to bars being fucked up in their CSS
    refreshBar() {
      this.$refs.myref.classList.contains("minWidth1px") ?
        this.$refs.myref.classList.remove("minWidth1px") :
        this.$refs.myref.classList.add("minWidth1px");
    }
    ,
    distributeItems: function (items) {
      // add id's
      this.addIds(items);
      // items.map(item => item.id = this.generateId(item));
    },
    deleteMember: function () {
      deleteCommunityMember(this.communityId, this.memberDetails.id)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.successfulMemberDelete
            this.successAlert = true
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    changeMemberRole: function () {
      if (this.memberDetails.role === 'member') {
        this.memberDetails.role = 'manager'
      } else {
        this.memberDetails.role = 'member'
      }
      updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.successfulRoleChange
            this.successAlert = true
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateOriginalBarDetails: function () {
      this.originalBarDetails = JSON.parse(JSON.stringify(this.barDetails));
    },
    addPersonalBar: function () {
      if (this.barDetails.is_shared) {
        this.onSave = true

        this.barDetails.name = this.memberDetails.first_name
        this.barDetails.is_shared = false

        const data = this.barDetails
        // const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
        // data.items = this.primaryItems.concat(drawerItems)

        createCommunityBar(this.communityId, data)
          .then((resp) => {
            if (resp.status === 200) {
              this.memberDetails.bar_id = resp.data.bar.id
              updateCommunityMember(this.communityId, this.memberDetails.id, this.memberDetails)
                .then((resp) => {
                  if (resp.status === 200) {
                    this.successMessage = MESSAGES.barUpdated
                    this.successAlert = true
                    this.isChanged = false
                    this.updateOriginalBarDetails();
                    setTimeout(() => {
                      this.successAlert = false
                    }, 3000)
                  }
                })
                .catch(err => {
                  console.error(err)
                })
            }
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        this.saveBar()
      }
    },
    addBar: function () {
      this.onSave = true
      const data = this.barDetails
      data.is_shared = true
      // const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
      // data.items = this.primaryItems.concat(drawerItems)

      createCommunityBar(this.communityId, data)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.barAdded
            this.successAlert = true
            this.isChanged = false
            this.updateOriginalBarDetails();

            setTimeout(() => {
              this.successAlert = false
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    saveBar: function () {
      this.onSave = true
      const data = this.barDetails
      // const drawerItems = this.drawerItems.concat(this.drawerItemsSecond)
      // data.items = this.primaryItems.concat(drawerItems)

      updateCommunityBar(this.communityId, this.$route.query.barId, data)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.barUpdated
            this.successAlert = true
            this.isChanged = false
            this.updateOriginalBarDetails();

            setTimeout(() => {
              this.successAlert = false
            }, 3000)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    deleteBar: function () {
      deleteCommunityBar(this.communityId, this.$route.query.barId)
        .then((resp) => {
          if (resp.status === 200) {
            this.successMessage = MESSAGES.successfulBarDelete
            this.successAlert = true
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 3000)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    expandCatalogButton: function (button, buttonId) {
      this.expandedCatalogButtonId = buttonId;
      this.expandedCatalogButton = button;
    },
    buttonToRemove: function (item) {
      // remove from items list
      // bar and drawer lists are automatically updated from watcher
      this.barDetails.items = this.barDetails.items.filter(x => x.id !== item.id);
      this.$bvModal.hide('modalEditGeneric')
      this.setBarChanged();
    },
    buttonToEdit: function (item, evt) {
      if (this.dragInProgress) {
        return;
      }
      this.buttonEditStorage = item;
      this.$bvModal.show('modalEditGeneric')
    },
    refreshButton: function (updated) {
      // updating the data in a button (on edit)
      this.editDialogDetails = false
      this.editDialogSubkindIcons = true
      if (updated) {
        this.setBarChanged();
      }
    },
    editChangeColor: function (hex) {
      this.buttonEditStorage.configuration.color = hex
    },
    editChangeIcon: function (icon) {
      this.buttonEditStorage.configuration.image_url = icon
    },
    getMembersCount: function () {
      if (this.members && this.members.length > 0) {
        return this.members.length
      }
      return 0
    },
    loadBarMembers: function () {
      getCommunityBars(this.communityId)
        .then(resp => {
          const barsData = resp.data.bars
          getCommunityMembers(this.communityId)
            .then((resp) => {
              this.barsList = barsData
              this.membersList = resp.data.members
              if (resp.data.members.length > 0) {
                for (let i = 0; i < resp.data.members.length; i++) {
                  if (this.$route.query.barId === resp.data.members[i].bar_id) {
                    this.members.push(resp.data.members[i])
                  }
                }
              }
            })
            .catch(err => {
              console.error(err)
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    getBarRemoveValidity: function () {
      if (this.barDetails.name !== 'Default' && this.getMembersCount() === 0) {
        return true
      }
      return false
    },
    loadMemberData: function () {
      getCommunityMember(this.communityId, this.activeMemberId)
        .then((resp) => {
          this.memberDetails = resp.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    getCommunityData: function () {
      getCommunity(this.communityId)
        .then((community) => {
          this.community = community.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    generateId: function (item) {
      let id = ''
      if (item) {
        id += Math.floor(Math.random() * Math.floor(99999999))
        id += '-' + item.configuration.label.toLowerCase()
        id += '-' + (item.configuration.subkind ? 'sub-' + item.configuration.subkind.toLowerCase() : 'generic-kind')
        id += '-' + Math.floor(Math.random() * Math.floor(99999999))
      }
      return id
    },
    addIdsToCatalogButtons(buttonCatalog) {
      for (let category in buttonCatalog) {
        for (let button in buttonCatalog[category]) {
          buttonCatalog[category][button].id = this.generateId(buttonCatalog[category][button]);
        }
      }
      return buttonCatalog;
    },
    updateAvailableBars() {
      this.availableBars = this.barsList.filter((bar) => {
        return bar.is_shared;
      });
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    editSubKindIcons: function () {
      const data = {}
      if (this.buttonEditStorage.configuration.subkind && this.subkindIcons[this.buttonEditStorage.configuration.subkind]) {
        for (let i = 0; i < this.subkindIcons[this.buttonEditStorage.configuration.subkind].length; i++) {
          data[this.subkindIcons[this.buttonEditStorage.configuration.subkind][i]] = icons[this.subkindIcons[this.buttonEditStorage.configuration.subkind][i]]
        }
      }
      return data
    },
    activeMemberId: function () { return this.$route.query.memberId },
  },
  mounted () {
    this.loadAllData()
  },
  watch: {
    'barDetails.items': function (newValue, oldValue) {
      this.distributeItems(newValue)
    },
    'memberDetails.id': function (newValue, oldValue) {
      this.updateAvailableBars();
      this.barSelectedInDropdown = this.memberDetails.bar_id;

    },
    barsList: function (newValue) {
      this.updateAvailableBars();
    },
    makeAButtons: function (newValue, oldValue) {
      if (!this.dragMakeAButton) {
        this.makeAButtons = oldValue
        this.dragMakeAButton = true
      }
    },
    predefinedButtons: function (newValue, oldValue) {
      if (!this.dragPredefinedButton) {
        this.predefinedButtons = oldValue
        this.dragPredefinedButton = true
      }
    },
    drawerItemsSecond: function (newValue, oldValue) {
      if (oldValue.length !== newValue.length) {
        this.isChanged = true
      }
      let item = {}
      if (newValue && newValue.length > 0) {
        for (let i = 0; i < newValue.length; i++) {
          if (newValue[i].is_primary === true) {
            item = newValue[i]
            item.is_primary = false
          }
        }
      }
    },
    isChanged: function () {
      this.$store.dispatch('unsavedChanges', this.isChanged)
    },
    '$route.query': function () {
      this.members = []
      this.initialChangesPrimaryItems = false
      this.initialChangesDrawerItems = false
      this.loadAllData()
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (this.isChanged) {
      const confirm = window.confirm(this.leavePageMessage)
      if (confirm) {
        this.isChanged = false
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isChanged) {
      const confirm = window.confirm(this.leavePageMessage)
      if (confirm) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  beforeUpdate() {
    this.refreshBar();
  },
  data () {
    return {
      // messages
      leavePageMessage: MESSAGES.leavePageAlert,
      successMessage: '',
      availableBars: [],
      barSelectedInDropdown: '',
      // flags
      addToBar: false,
      addToDrawer: false,
      newBar: false,
      openDrawer: false,
      successAlert: false,
      editDialogDetails: false,
      editDialogSubkindIcons: true,
      tab: 0,
      dragFromEditor: false,
      isChanged: false,
      editBarName: false,
      onSave: false,
      initialChangesPrimaryItems: false,
      initialChangesDrawerItems: false,
      // data for the community manager
      community: {},
      barsList: [],
      membersList: [],

      buttonCatalog: this.addIdsToCatalogButtons(buttonCatalog),
      dragInProgress: false,
      expandedCatalogButtonId: null,

      // storage
      buttonStorage: {},
      buttonEditStorage: {
        configuration: {
          label: '',
          color: '',
          image_url: ''
        }
      },
      invitationEmail: '',
      barDetails: {},
      originalBarDetails: {},
      members: [],
      memberDetails: {},
      // drawerItems: [],
      // drawerItemsSecond: [],
      // primaryItems: [],
      // makeAButtons: this.getMakeAButtons(),
      // predefinedButtons: this.getPredefinedButtons(),

      // configurations
      preview: {
        drawer: {
          w: 2,
          h: 6
        },
        bar: {
          h: 100
        }
      },
      newBarDetails: {
        name: 'New Bar',
        is_shared: false,
        items: []
      },
      bar: {
        settings: {
          barOnRight: true,
          cannotClose: false,
          startsOpen: false
        }
      },
      predefinedBars: predefinedBars,
      colors: colors,
      icons: icons,
      subkindIcons: subkindIcons
    }
  }
}
</script>
