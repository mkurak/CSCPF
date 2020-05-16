<template>
  <div class="pl-4 pr-4">
    <v-progress-circular
      :indeterminate="active"
      size="20"
      width="2"
    ></v-progress-circular>
    <span v-if="active" class="pl-2 caption">
      {{ $t("components.layout.socketUpdater.template.statusText") }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["g_storages_backgroundJobCount"]),
    active() {
      return this.g_storages_backgroundJobCount > 0;
    }
  }
};
</script>

<style></style>
