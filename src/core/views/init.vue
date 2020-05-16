<template>
  <div></div>
</template>

<script>
import Tools from "@/core/plugins/tools";

export default {
  mounted() {
    let version = JSON.stringify(
      require("../../../package.json").projectVersion
    );
    let localVersion = localStorage.getItem("cscpf_version");
    if (Tools.isNullOrEmpty(localVersion)) {
      this.$router.push("/login");
    } else {
      if (version !== localVersion) {
        this.$router.push("/login");
      } else {
        this.$store.dispatch("a_initializer_start").then(() => {
          if (!this.$store.getters.g_initializer_loginStatus)
            this.$router.push("/login");
          else {
            this.$router.push("/");
          }
        });
      }
    }
  }
};
</script>

<style></style>
