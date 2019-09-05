<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >Yetki Tanımları</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex>
        <p class="body-2">
          Aşağıdaki listede, sistemde bulunan tüm yetki tanımları yer
          almaktadır. Bu tanımlarla ilgili herhangi bir işlem yapamazsınız.
          Aşağıdaki liste ile sadece yetki tanımlarıyla ilgili bilgi verilmek
          istenmiştir.
          <br />Bu yetkiler sistem yapımcıları tarafından sisteme eklenmektedir
          ve ihtiyaca göre kullanılmaktadır.
        </p>
        <v-sheet class="pa-4 indigo lighten-3 mr-2">
          <v-text-field
            v-model="search"
            :label="$t('views.roles.template.searchPlaceholder')"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>
        <v-list>
          <v-list-item v-for="role in items" :key="role.id">
            <v-list-item-content>
              <v-list-item-title class="title">{{
                Tools.checkI18n(role.roleName)
              }}</v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">{{
                Tools.checkI18n(role.roleTitle)
              }}</v-list-item-subtitle>
              <v-list-item-subtitle class="caption">{{
                Tools.checkI18n(role.roleDescription)
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "../../plugins/tools";
import GlobalEnv from "../../constants/global-env";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    GlobalEnv,
    Tools,
    contentViewStatus: false,
    search: ""
  }),
  computed: {
    ...mapGetters(["g_storages_role_items"]),
    items() {
      if (Tools.isNullOrEmpty(this.search)) {
        return this.g_storages_role_items;
      } else {
        let items = this.g_storages_role_items.filter(item => {
          return (
            item.roleName.toUpperCase().indexOf(this.search.toUpperCase()) >
              -1 ||
            item.roleTitle.toUpperCase().indexOf(this.search.toUpperCase()) >
              -1 ||
            item.roleDescription
              .toUpperCase()
              .indexOf(this.search.toUpperCase()) > -1
          );
        });
        return items;
      }
    }
  },
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  }
};
</script>

<style></style>
