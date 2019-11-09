import Vue from 'vue';
import Vuex from 'vuex';
import get from 'lodash/get';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routeLoading: false,
    properties: [],
    networkStats: 0,
  },
  mutations: {
    setRouteLoading: (state, status) => {
      state.routeLoading = status;
    },
    receiveProperties: (state, properties) => state.properties = properties, /* eslint-disable-line */
    receiveNetworkStats: (state, stats) => state.networkStats = stats, /* eslint-disable-line */
  },
  actions: {
    fetchProperties: async ({ commit }) => {
      const { data } = await axios.get('https://gist.githubusercontent.com/ruimendesM/bf8d095f2e92da94938810b8a8187c21/raw/70b112f88e803bf0f101f2c823a186f3d076d9e6/properties.json');
      commit('receiveProperties', data.properties.map(p => ({
        id: p.id,
        name: p.name,
        rating: {
          value: get(p, 'overallRating.overall', 0),
          count: get(p, 'overallRating.numberOfRatings', 0),
        },
        type: p.type,
        featured: p.featured,
        lowestPricePerNight: (get(p, 'lowestPricePerNight.value', 0) / 7.55).toFixed(2),
        distance: get(p, 'distance.value', 0),
        location: {
          latitude: p.latitude,
          longitude: p.longitude,
        },
        images: p.images.map(i => `https://${i.prefix}${i.suffix}`),
      })));
    },
    fetchNetworkStats: async ({ commit }) => {
      /**
       * I'm not entirely sure what this API is supposed to do
       * Seems broken. I assume for this example that is supposed
       * to give the time it took to serve results?
       */
      const { data } = await axios.get('https://gist.githubusercontent.com/ruimendesM/cb9313c4d4b3434975a3d7a6700d1787/raw/02d17a4c542ac99fe559df360cbfe9ba24dbe6be/stats?action=load&duration=10000');
      commit('receiveNetworkStats', data);
    },
  },
});
