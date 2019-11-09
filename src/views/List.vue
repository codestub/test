<template>
  <div class="list">
    <div class="list__container">
      <div class="list__hero">
        <h1>HostelWorld</h1>
      </div>
      <div class="list__options">
        <span>{{ properties.length }} properties ({{ networkStats }} seconds)</span>
      </div>
      <div class="list__properties">
        <Property
          v-for="property in paginatedProperties"
          :key="property.id"
          :property="property"
        />
      </div>
      <div class="list__pagination">
        <Button
          @click="handleClickPrevious"
          :disabled="page === 1">
          Previous
        </Button>
        <Button
          @click="handleClickNext"
          :disabled="page === maxPages">
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store';
import Property from '../components/Property.vue';
import Button from '../components/Button.vue';

/**
 * TODO:
 * - sorting (distance, price, rating)
 * - filtering (price range, distance, rating)
 * - better pagination (results per page etc.)
 * - many many things
 */

export default {
  components: {
    Property,
    Button,
  },
  data() {
    return {
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    ...mapState({
      properties: state => state.properties,
      networkStats: state => state.networkStats,
    }),
    maxPages() {
      return Math.floor(this.properties.length / this.pageSize) + 1;
    },
    paginatedProperties() {
      return this.properties.splice((this.page - 1) * this.pageSize, this.pageSize);
    },
  },
  methods: {
    handleClickNext() {
      if (this.page < this.maxPages) {
        this.page = this.page + 1;
      }
    },
    handleClickPrevious() {
      if (this.page > 1) {
        this.page = this.page - 1;
      }
    },
  },
  async beforeRouteEnter(to, from, next) {
    try {
      await Promise.all([
        store.dispatch('fetchProperties'),
        store.dispatch('fetchNetworkStats'),
      ]);
    } catch (e) {
      console.error('Failed to load properties');
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.list {
  background-color: $neutral0;
  &__hero {
    display: flex;
    justify-content: center;
    font-size: $size6;
    margin: auto;
    padding: $space4;
  }
  &__container {
    width: $space15;
    margin: auto;
    padding: $space2;
  }
  &__options {
    // width: $space15;
    // margin: auto;
    padding: $space2;
  }
  &__properties {
    display: grid;
    grid-gap: $space3;
    // width: $space15;
    // margin: auto;
    // padding: 0 $space2;
  }
  &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space3 0;
  }
}
</style>
