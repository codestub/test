<template>
  <div class="property">
    <div
      :style="{ backgroundImage: `url(${property.images[0]})` }"
      class="property__image"
    />
    <div class="property__content">
      <div class="property__content-upper">
        <h2 class="property__name caps">{{ property.name }}</h2>
        <span class="property__price">€{{ Math.floor(property.lowestPricePerNight) }}</span>
      </div>
      <div class="property__content-lower">
        <div class="property__rating">
          <span class="property__rating-value">
            {{ (property.rating.value / 100 * 5).toFixed(1) }}
          </span>
          <Stars :rating="property.rating.value" />
          <span class="property__rating-count">
            ({{ property.rating.count }} reviews)
          </span>
        </div>
        <div class="property__distance">{{ property.distance }} km</div>
      </div>
    </div>
  </div>
</template>

<script>
import t from 'vue-types';
import get from 'lodash/get';
import Stars from './Stars.vue';

export default {
  components: {
    Stars,
  },
  props: {
    property: t.object.isRequired,
  },
  computed: {
    firstImage() {
      return get(this.property.images, '[0]');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.property {
  display: grid;
  grid-template-columns: min-content auto;
  border-radius: $space0;
  overflow: hidden;
  box-shadow: $shadow2;
  background-color: $white;
  user-select: none;
  cursor: pointer;
  &__image {
    width: $space9;
    height: $space9;
    background-position: center;
    background-size: cover;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: $space2;
  }
  &__content-upper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__name {
    font-size: $size3;
    // font-weight: $bold;
  }
  &__price {
    font-weight: $bold;
    font-size: $size3;
  }
  &__rating {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: $space1;
    align-items: center;
    align-self: flex-start;
    padding-top: $space2;
  }
  &__rating-count {
    font-style: italic;
  }
  &__content-lower {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  &__distance {
    align-self: flex-end;
  }
}
</style>
