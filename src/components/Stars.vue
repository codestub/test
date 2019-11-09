<template>
  <div class="stars">
    <div class="stars__background">
      <i class="far fa-star stars__icon" />
      <i class="far fa-star stars__icon" />
      <i class="far fa-star stars__icon" />
      <i class="far fa-star stars__icon" />
      <i class="far fa-star stars__icon" />
    </div>
    <div
      :style="{ width: `${rating}%` }"
      class="stars__foreground">
      <div class="stars__foreground--clip">
        <i class="fas fa-star stars__icon" />
        <i class="fas fa-star stars__icon" />
        <i class="fas fa-star stars__icon" />
        <i class="fas fa-star stars__icon" />
        <i class="fas fa-star stars__icon" />
      </div>
    </div>
  </div>
</template>

<script>
import t from 'vue-types';

export default {
  props: {
    rating: t.number,
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.stars {
  position: relative;
  &__background {
    color: $neutral2;
  }
  &__foreground {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    color:  #fcd529;
    overflow: hidden;
  }
  &__foreground--clip {
    display: flex;
    flex-wrap: nowrap;
  }
}
</style>