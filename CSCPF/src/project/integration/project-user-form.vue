<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    user: Object,
    default: null
  },
  methods: {
    save() {
      return new Promise(resolve => {
        resolve();
      });
    }
  }
};
</script>

<style></style>
