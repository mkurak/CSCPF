<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("a_initializer_start").then(() => {
      if (!this.$store.getters.g_initializer_loginStatus)
        this.$router.push("/login");
      else {
        this.$router.push("/");
      }
    });
  }
};
</script>

<style></style>
