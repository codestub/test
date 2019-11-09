import { mount, createLocalVue } from '@vue/test-utils';
import List from '@/views/List.vue';
import { italic } from 'ansi-colors';
import Vuex from 'vuex';

const localVue = createLocalVue();

const render = () => {
  const store = new Vuex.Store({
    state: {
      properties: [
        {
          id: 1,
          name: 'Property1',
          images: [],
          rating: {}
        },
        {
          id: 2,
          name: 'Property2',
          images: [],
          rating: {}
        },
      ]
    },
  });
  return mount(List, {
    localVue,
    store,
  });
}

describe('List.vue', () => {
  it('correctly renders properties', () => {
    const wrapper = render();
    expect(wrapper.findAll('.property').length).toBe(2);
  });

  // test.todo('correctly paginates results');
});