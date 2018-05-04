import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import TimeEntries from '@/components/TimeEntries.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/time-entries', function() {
  return {
    apiTimeEntries: {
      getAll: function (host, token, success, error) {
        let response = {
          data: [{
            id: 1,
            description: 'Time Entry 1',
            timeSpent: 1.25000,
            task: 1,
          }, {
            id: 2,
            description: 'Time Entry 2',
            timeSpent: 2.50000,
            task: 2,
          }, {
            id: 3,
            description: 'Time Entry 3',
            timeSpent: 3.75000,
            task: 3,
          }]
        };
        success(response);
      }
    }
  }
});

import { apiTimeEntries } from '@/api/time-entries';

describe('TimeEntries.vue', function() {
  let wrapper = shallow(TimeEntries, { localVue, store });

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Shows all the time entries', function() {
    expect(wrapper.vm.timeEntries[0].description).toBe('Time Entry 1');
    expect(wrapper.vm.timeEntries[1].description).toBe('Time Entry 2');
    expect(wrapper.vm.timeEntries[2].description).toBe('Time Entry 3');
  });

  it('Shows the empty message if no data is provided', function() {
    wrapper.setData({
      timeEntries: [],
    });

    expect(wrapper.find('.table-empty--message').isVisible()).toBe(true);
  });
});
