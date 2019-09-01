<template>
  <v-overlay :value="g_layout_loading_view">
    <v-container fluid class="text-center">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
      <v-spacer></v-spacer>
      <span>{{ g_layout_loading_msg }}</span>
    </v-container>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["g_layout_loading_view", "g_layout_loading_msg"])
  }
};
</script>

<style scoped></style>
