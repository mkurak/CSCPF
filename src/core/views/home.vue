<template>
  <v-card v-if="contentViewStatus">
    <v-card-title
      :class="[GlobalEnv.layout.titleStateBgColor, 'white--text', 'headline']"
      >Ana Ekran</v-card-title
    >
    <v-layout justify-space-between pa-4>
      <v-flex>Anasayfa</v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tools from "@/core/plugins/tools";
import GlobalEnv from "@/core/constants/global-env";

export default {
  data: () => ({
    GlobalEnv,
    contentViewStatus: false
  }),
  async mounted() {
    await Tools.sleep(GlobalEnv.layout.defaultSleepDelay);
    this.contentViewStatus = true;
  }
};
</script>

<style></style>
