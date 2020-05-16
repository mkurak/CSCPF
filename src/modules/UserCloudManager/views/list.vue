<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
    >
      {{ $t("modules.userCloudManager.views.list.template.title") }}
    </v-card-title>
    <v-layout justify-space-between pa-4>
      <v-flex>
        <v-row>
          <v-col cols="12">
            <ToolbarComponent
              :current-directory="selectedDirectory"
              :current-file="selectedFile"
              @newFileAction="actionNewFile"
              @newDirectoryAction="actionNewDirectory"
            ></ToolbarComponent>
            <v-divider></v-divider>
          </v-col>
          <v-col
            v-if="g_storages_modules_userCloudManager_fm_items.length > 0"
            cols="12"
          >
            <span>{{ getCurrentPath }}</span>
            <v-divider></v-divider>
          </v-col>
          <v-col
            v-if="g_storages_modules_userCloudManager_fm_items.length > 0"
            cols="12"
          >
            <v-row>
              <v-col cols="8" class="colTransition">
                <TreeComponent
                  ref="treeComp"
                  @selectTreeItem="selectTreeItem"
                  @newFileAction="actionNewFile"
                  @newDirectoryAction="actionNewDirectory"
                  @editDirectoryAction="actionEditDirectory"
                  @editFileAction="actionEditFile"
                  @removeDirectoryAction="actionRemoveDirectory"
                  @removeFileAction="actionRemoveFile"
                  @shareFileAction="actionShareFile"
                  @shareDirectoryAction="actionShareDirectory"
                  @choseDirectoryAction="actionChoseDirectory"
                ></TreeComponent>
              </v-col>
              <v-col cols="4" class="colTransition">
                <v-card v-if="viewDetailsStatus" outlined>
                  <v-card-text>
                    <div v-if="selectedDirectory">
                      <p class="display-2">
                        {{ selectedDirectory.text }}
                      </p>
                      <p class="subtitle-1">
                        {{ selectedDirectory.directoryData.description }}
                      </p>
                      <v-divider class="mb-4"></v-divider>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.folderCurrentPathTitle"
                            )
                          }}
                        </span>
                        <span>{{ selectedDirectory.fullDirectoryPath }}</span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.folderCountFileTitle"
                            )
                          }}
                        </span>
                        <span>{{
                          selectedDirectory.directoryData.fileCount
                        }}</span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.folderCountSizeTitle"
                            )
                          }}
                        </span>
                        <span>{{
                          getSizeText(selectedDirectory.directoryData.size)
                        }}</span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.folderAddedDateTitle"
                            )
                          }}
                        </span>
                        <span>
                          {{
                            selectedDirectory.directoryData.addingDate
                              | formatDate
                          }}
                          ({{
                            g_storages_user_fullName(
                              selectedDirectory.directoryData.addingUserId
                            )
                          }})
                        </span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.folderLastUpdateDateTitle"
                            )
                          }}
                        </span>
                        <span>
                          {{
                            selectedDirectory.directoryData.updatingDate
                              | formatDate
                          }}
                          ({{
                            g_storages_user_fullName(
                              selectedDirectory.directoryData.updatingUserId
                            )
                          }})
                        </span>
                      </p>
                      <p></p>
                      <v-divider></v-divider>
                      <v-row>
                        <v-col
                          v-if="selectedDirectory.shared.groups.length > 0"
                          cols="12"
                        >
                          <span class="font-weight-bold">
                            {{
                              $t(
                                "modules.userCloudManager.views.list.template.folderSharedGroupsTitle"
                              )
                            }}
                          </span>
                          <br />
                          <v-list dense>
                            <v-list-item
                              v-for="data in selectedDirectory.shared.groups"
                              :key="data.id"
                            >
                              <v-list-item-icon>
                                <v-icon>mdi-account-group</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                {{
                                  g_storages_userGroups_items_get(
                                    data.sharedGroupId
                                  ).groupName
                                }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col>
                        <v-col
                          v-if="selectedDirectory.shared.users.length > 0"
                          cols="12"
                        >
                          <span class="font-weight-bold">
                            {{
                              $t(
                                "modules.userCloudManager.views.list.template.folderSharedUsers"
                              )
                            }}
                          </span>
                          <br />
                          <v-list dense>
                            <v-list-item
                              v-for="data in selectedDirectory.shared.users"
                              :key="data.id"
                            >
                              <v-list-item-avatar>
                                <v-avatar size="32px">
                                  <v-img
                                    :src="
                                      Tools.getImage(
                                        GlobalEnv.socketUsers.profilePic.path,
                                        g_storages_user_getUser(
                                          data.sharedUserId
                                        ).profilePic,
                                        GlobalEnv.socketUsers.profilePic.default
                                      )
                                    "
                                  ></v-img>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                {{
                                  g_storages_user_fullName(data.sharedUserId)
                                }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </div>
                    <div v-if="selectedFile">
                      <p class="display-2">
                        {{ selectedFile.text }}
                      </p>
                      <p class="subtitle-1">
                        {{ selectedFile.fileData.description }}
                      </p>
                      <v-divider class="mb-4"></v-divider>
                      <v-row
                        v-if="checkImageFile(selectedFile.fileData.path)"
                        align="center"
                        justify="center"
                      >
                        <v-col cols="12">
                          <v-img
                            :src="
                              Tools.getImage(
                                GlobalEnv.modules.userCloudManager.filePath.fm,
                                selectedFile.fileData.path,
                                null
                              )
                            "
                            :lazy-src="
                              Tools.getImage(
                                GlobalEnv.modules.userCloudManager.filePath.fm,
                                selectedFile.fileData.path,
                                null
                              )
                            "
                            aspect-ratio="1"
                            max-height="300"
                          ></v-img>
                          <v-divider class="mb-4"></v-divider>
                        </v-col>
                      </v-row>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.fileCurrentPathTitle"
                            )
                          }}
                        </span>
                        <span>{{ selectedFile.fullDirectoryPath }}</span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.fileSize"
                            )
                          }}
                        </span>
                        <span>{{
                          getSizeText(selectedFile.fileData.size)
                        }}</span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.fileAddedDateTitle"
                            )
                          }}
                        </span>
                        <span>
                          {{ selectedFile.fileData.addingDate | formatDate }}
                          ({{
                            g_storages_user_fullName(
                              selectedFile.fileData.addingUserId
                            )
                          }})
                        </span>
                      </p>
                      <p class="body-2">
                        <span class="font-weight-bold">
                          {{
                            $t(
                              "modules.userCloudManager.views.list.template.fileLastUpdateDateTitle"
                            )
                          }}
                        </span>
                        <span>
                          {{ selectedFile.fileData.updatingDate | formatDate }}
                          ({{
                            g_storages_user_fullName(
                              selectedFile.fileData.updatingUserId
                            )
                          }})
                        </span>
                      </p>
                      <p></p>
                      <v-divider></v-divider>
                      <v-row>
                        <v-col
                          v-if="selectedFile.shared.groups.length > 0"
                          cols="12"
                        >
                          <span class="font-weight-bold">
                            {{
                              $t(
                                "modules.userCloudManager.views.list.template.fileSharedGroups"
                              )
                            }}
                          </span>
                          <br />
                          <v-list dense>
                            <v-list-item
                              v-for="data in selectedFile.shared.groups"
                              :key="data.id"
                            >
                              <v-list-item-icon>
                                <v-icon>mdi-account-group</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                {{
                                  g_storages_userGroups_items_get(
                                    data.sharedGroupId
                                  ).groupName
                                }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col>
                        <v-col
                          v-if="selectedFile.shared.users.length > 0"
                          cols="12"
                        >
                          <span class="font-weight-bold">
                            {{
                              $t(
                                "modules.userCloudManager.views.list.template.fileSharedUsers"
                              )
                            }}
                          </span>
                          <br />
                          <v-list dense>
                            <v-list-item
                              v-for="data in selectedFile.shared.users"
                              :key="data.id"
                            >
                              <v-list-item-avatar>
                                <v-avatar size="32px">
                                  <v-img
                                    :src="
                                      Tools.getImage(
                                        GlobalEnv.socketUsers.profilePic.path,
                                        g_storages_user_getUser(
                                          data.sharedUserId
                                        ).profilePic,
                                        GlobalEnv.socketUsers.profilePic.default
                                      )
                                    "
                                  ></v-img>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                {{
                                  g_storages_user_fullName(data.sharedUserId)
                                }}
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                      v-if="selectedDirectory"
                      depressed
                      small
                      color="warning"
                      @click="actionEditDirectory"
                    >
                      <v-icon left>mdi-square-edit-outline</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.updateFolderBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedDirectory"
                      depressed
                      small
                      color="primary"
                      @click="actionShareDirectory"
                    >
                      <v-icon left>mdi-share-variant</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.shareFolderBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedDirectory"
                      depressed
                      small
                      color="red"
                      class="white--text"
                      @click="actionRemoveDirectory"
                    >
                      <v-icon left>mdi-file-remove</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.removeFolderBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedFile"
                      depressed
                      small
                      color="indigo"
                      class="white--text"
                      :href="getFileDownloadUrl()"
                      target="_blank"
                    >
                      <v-icon left>mdi-file-download</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.downloadFolderBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedFile"
                      depressed
                      small
                      color="warning"
                      @click="actionEditFile"
                    >
                      <v-icon left>mdi-square-edit-outline</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.updateFileBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedFile"
                      depressed
                      small
                      color="primary"
                      @click="actionShareFile"
                    >
                      <v-icon left>mdi-share-variant</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.shareFileBtn"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      v-if="selectedFile"
                      depressed
                      small
                      color="red"
                      class="white--text"
                      @click="actionRemoveFile"
                    >
                      <v-icon left>mdi-file-remove</v-icon>
                      {{
                        $t(
                          "modules.userCloudManager.views.list.template.removeFileBtn"
                        )
                      }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <div
                  v-else
                  style="align-self: center; text-align: center; width: 100%;"
                >
                  <span
                    class="title grey--text text--lighten-1 font-weight-light"
                  >
                    {{
                      $t(
                        "modules.userCloudManager.views.list.template.emptySelectedDesc"
                      )
                    }}
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-if="g_storages_modules_userCloudManager_fm_items.length === 0"
            cols="12"
          >
            <v-alert outlined type="info" prominent border="left">
              {{
                $t("modules.userCloudManager.views.list.template.emptyListInfo")
              }}
            </v-alert>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <v-dialog v-model="actionDialog" width="600">
      <NewFileComponent
        v-if="actionType === 'newFile'"
        ref="newFile"
        :current-directory="selectedDirectory"
        @closeDialog="closeDialog"
      ></NewFileComponent>
      <NewDirectoryComponent
        v-if="actionType === 'newDirectory'"
        ref="newDirectory"
        :current-directory="selectedDirectory"
        @closeDialog="closeDialog"
      ></NewDirectoryComponent>
      <EditDirectoryComponent
        v-if="actionType === 'editDirectory'"
        ref="editDirectory"
        :current-directory="selectedDirectory"
        @closeDialog="closeDialog"
      ></EditDirectoryComponent>
      <EditFileComponent
        v-if="actionType === 'editFile'"
        ref="editFile"
        :current-file="selectedFile"
        @closeDialog="closeDialog"
      ></EditFileComponent>
      <ShareFileComponent
        v-if="actionType === 'shareFile'"
        ref="shareFile"
        :current-file="selectedFile"
        @closeDialog="closeDialog"
      ></ShareFileComponent>
      <ShareDirectoryComponent
        v-if="actionType === 'shareDirectory'"
        ref="shareDirectory"
        :current-directory="selectedDirectory"
        @closeDialog="closeDialog"
      ></ShareDirectoryComponent>
      <SelectDirectoryComponent
        v-if="actionType === 'choseDirectory'"
        ref="choseDirectory"
        :action-type="choseDirectoryType"
        :item="selectedDirectory || selectedFile"
        @closeDialog="closeDialog"
        @actionMoveDirectory="actionMoveDirectory"
        @actionMoveFile="actionMoveFile"
        @actionCopyDirectory="actionCopyDirectory"
        @actionCopyFile="actionCopyFile"
      ></SelectDirectoryComponent>
    </v-dialog>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";
import { mapGetters } from "vuex";
import t from "@/core/plugins/i18n";
import ToolbarComponent from "@/modules/UserCloudManager/components/toolbar";
import TreeComponent from "@/modules/UserCloudManager/components/tree";
import NewFileComponent from "@/modules/UserCloudManager/components/new-file";
import NewDirectoryComponent from "@/modules/UserCloudManager/components/new-directory";
import EditDirectoryComponent from "@/modules/UserCloudManager/components/edit-directory";
import EditFileComponent from "@/modules/UserCloudManager/components/edit-file";
import ShareFileComponent from "@/modules/UserCloudManager/components/share-file";
import ShareDirectoryComponent from "@/modules/UserCloudManager/components/share-directory";
import SelectDirectoryComponent from "@/modules/UserCloudManager/components/select-directory";

export default {
  components: {
    ToolbarComponent,
    TreeComponent,
    NewFileComponent,
    NewDirectoryComponent,
    EditDirectoryComponent,
    EditFileComponent,
    ShareFileComponent,
    ShareDirectoryComponent,
    SelectDirectoryComponent
  },
  data: () => ({
    Tools,
    GlobalEnv,
    contentViewStatus: false,
    actionDialog: false,
    actionType: "",
    selectedDirectory: null,
    selectedFile: null,
    choseDirectoryType: "move"
  }),
  computed: {
    ...mapGetters([
      "g_storages_user_fullName",
      "g_storages_modules_userCloudManager_fm_items",
      "g_storages_modules_userCloudManager_fm_items_itemsLoading",
      "g_storages_userGroups_items_get",
      "g_storages_user_fullName",
      "g_storages_user_getUser"
    ]),
    getCurrentPath() {
      if (
        Tools.isNullOrEmpty(this.selectedDirectory) &&
        Tools.isNullOrEmpty(this.selectedFile)
      ) {
        return "/";
      } else {
        if (!Tools.isNullOrEmpty(this.selectedDirectory))
          return this.selectedDirectory.fullDirectoryPath;
        else return this.selectedFile.fullDirectoryPath;
      }
    },
    viewDetailsStatus() {
      return (
        !Tools.isNullOrEmpty(this.selectedFile) ||
        !Tools.isNullOrEmpty(this.selectedDirectory)
      );
    }
  },
  watch: {
    g_storages_modules_userCloudManager_fm_items_itemsLoading(n) {
      if (!n) this.refreshSelected();
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  },
  methods: {
    actionNewFile() {
      this.actionType = "newFile";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.newFile.clearForm();
      }, 100);
    },
    actionNewDirectory() {
      this.actionType = "newDirectory";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.newDirectory.clearForm();
      }, 100);
    },
    actionEditDirectory() {
      this.actionType = "editDirectory";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.editDirectory.clearForm();
        this.$refs.editDirectory.loadForm();
      }, 100);
    },
    actionEditFile() {
      this.actionType = "editFile";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.editFile.clearForm();
        this.$refs.editFile.loadForm();
      }, 100);
    },
    actionRemoveDirectory() {
      if (Tools.isNullOrEmpty(this.selectedDirectory)) return;

      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$refs.treeComp.clearActive();

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.loading"
          )
        );

        let sendData = {
          id: this.selectedDirectory.value,
          status: false
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_removeDirectory_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionRemoveDirectory.successMsg"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    actionRemoveFile() {
      if (Tools.isNullOrEmpty(this.selectedFile)) return;

      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveFile.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveFile.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionRemoveFile.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionRemoveFile.loading"
          )
        );

        let sendData = {
          id: this.selectedFile.value,
          status: false
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_removeFile_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionRemoveFile.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionRemoveFile.successMsg"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();

            this.$refs.treeComp.clearActive();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    actionShareFile() {
      this.actionType = "shareFile";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.shareFile.clearForm();
      }, 100);
    },
    actionShareDirectory() {
      this.actionType = "shareDirectory";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.shareDirectory.clearForm();
      }, 100);
    },
    selectTreeItem(treeItem) {
      this.selectedDirectory = null;
      this.selectedFile = null;

      if (treeItem)
        if (treeItem.itemType === "directory")
          this.selectedDirectory = treeItem;
        else this.selectedFile = treeItem;
    },
    closeDialog() {
      this.actionType = "";
      this.actionDialog = false;
    },
    checkImageFile(path) {
      let getExtSplit = path.split(".");
      if (getExtSplit.length !== 2) return false;

      let getExt = getExtSplit[1];

      return (
        getExt === "jpg" ||
        getExt === "jpeg" ||
        getExt === "png" ||
        getExt === "svg"
      );
    },
    getSizeText(size) {
      return Tools.formatBytes(size);
    },
    getFileDownloadUrl() {
      return Tools.getImage(
        GlobalEnv.modules.userCloudManager.filePath.fm,
        this.selectedFile.fileData.path,
        null
      );
    },
    refreshSelected() {
      if (
        Tools.isNullOrEmpty(this.selectedDirectory) &&
        Tools.isNullOrEmpty(this.selectedFile)
      )
        return;

      if (!Tools.isNullOrEmpty(this.selectedDirectory)) {
        let findItem = Tools.findObjDeep(
          this.g_storages_modules_userCloudManager_fm_items,
          {
            itemType: "directory",
            value: this.selectedDirectory.value
          }
        );
        if (!Tools.isNullOrEmpty(findItem)) {
          this.selectedDirectory = findItem;
        }
      }

      if (!Tools.isNullOrEmpty(this.selectedFile)) {
        let findItem = Tools.findObjDeep(
          this.g_storages_modules_userCloudManager_fm_items,
          {
            itemType: "file",
            value: this.selectedFile.value
          }
        );
        if (!Tools.isNullOrEmpty(findItem)) {
          this.selectedFile = findItem;
        }
      }
    },
    actionChoseDirectory(processType) {
      this.choseDirectoryType = processType;
      this.actionType = "choseDirectory";
      this.actionDialog = true;
      setTimeout(() => {
        this.$refs.choseDirectory.reset();
      }, 100);
    },
    actionMoveDirectory(sourceDirectoryId, destinationDirectoryId) {
      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.loading"
          )
        );

        let sendData = {
          movedDirectoryId: sourceDirectoryId,
          targetDirectoryId: destinationDirectoryId
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_moveDirectory_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionMoveDirectory.successDesc"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    actionMoveFile(sourceFileId, destinationFileId) {
      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveFile.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveFile.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionMoveFile.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionMoveFile.loading"
          )
        );

        let sendData = {
          fileId: sourceFileId,
          targetDirectoryId: destinationFileId
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_moveFile_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionMoveFile.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionMoveFile.successMsg"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    actionCopyDirectory(sourceDirectoryId, destinationDirectoryId) {
      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.loading"
          )
        );

        let sendData = {
          copiedDirectoryId: sourceDirectoryId,
          targetDirectoryId: destinationDirectoryId
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_copyDirectory_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionCopyDirectory.successMsg"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    },
    actionCopyFile(sourceFileId, destinationFileId) {
      Tools.showConfirmMsg(
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyFile.confirmTitle"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyFile.confirmMsg"
        ),
        t.t(
          "modules.userCloudManager.views.list.script.methods.actionCopyFile.confirmInfo"
        )
      ).then(val => {
        if (!val) return;

        this.$store.commit(
          "m_layout_loading_msg",
          t.t(
            "modules.userCloudManager.views.list.script.methods.actionCopyFile.loading"
          )
        );

        let sendData = {
          fileId: sourceFileId,
          targetDirectoryId: destinationFileId
        };

        this.$store
          .dispatch(
            "a_storages_modules_userCloudManager_fm_copyFile_api",
            sendData
          )
          .then(() => {
            Tools.showSuccessMsg(
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionCopyFile.successTitle"
              ),
              t.t(
                "modules.userCloudManager.views.list.script.methods.actionCopyFile.successMsg"
              )
            );

            this.$store.commit("m_layout_loading_view", false);
            this.closeDialog();
          })
          .catch(err => {
            Tools.showErrorWithApi(
              err,
              null,
              "modules.userCloudManager.apiErrors.fm."
            );
            this.$store.commit("m_layout_loading_view", false);
          });
      });
    }
  }
};
</script>

<style scoped>
.colTransition {
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
</style>
