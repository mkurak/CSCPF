<template>
  <div></div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: () => ({}),
  methods: {
    save() {
      return new Promise(resolve => {
        resolve();
      });
    },
    validation() {
      return new Promise(resolve => {
        resolve();
      });
    }
  }
};
</script>

<style></style>
