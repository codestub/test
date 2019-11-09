<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="button caps">
    <slot />  
  </button>
</template>

<script>
export default {
  
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.button {
  padding: $space2 $space3;
  border: 2px solid $neutral8;
  background-color: $white;
  border-radius: $space0;
  font-weight: $bold;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
  }
}
</style>
