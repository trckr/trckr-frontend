import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import TrackedTimePerTaskChart from '@/components/TrackedTimePerTaskChart.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);


jest.mock('@/api/tasks', function() {
  return {
    apiTasks: {
      getAll: function (host, token, success, error) {
        let response = {
          data: [{
            id: 1,
            name: 'Test',
          }, {
            id: 2,
            name: 'Test 2',
          }]
        };
        success(response);
      }
    }
  }
});

jest.mock('@/api/time-entries', function() {
  return {
    apiTimeEntries: {
      getAll: function (host, token, success, error) {
        let response = {
          data: [{
            id: 1,
            description: 'Time Entry 1',
            startTime: '2000-01-01T00:00:00',
            timeSpent: 2.50000,
            task: 1,
            project: 1,
          }, {
            id: 2,
            description: 'Time Entry 2',
            startTime: '2000-01-02T00:00:00',
            timeSpent: 2.50000,
            task: 1,
            project: 1,
          }, {
            id: 3,
            description: 'Time Entry 3',
            startTime: '2000-01-03T00:00:00',
            timeSpent: 3.75000,
            task: 2,
            project: 1,
          }]
        };
        success(response);
      }
    }
  }
});

import { apiTasks } from '@/api/tasks';
import { apiTimeEntries } from '@/api/time-entries';

describe('Dashboard.vue', function() {
  let wrapper = shallow(TrackedTimePerTaskChart, { localVue, store });

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Canvas is rendered', function() {
    expect(wrapper.find('canvas')).toBeTruthy();
  });

  it('Time entries are grouped by task', function() {
    var trackedTimePerTask = wrapper.vm.chartData.datasets[0].data;

    expect(trackedTimePerTask.length).toBe(2);
    expect(trackedTimePerTask[0]).toBe(5.0);
    expect(trackedTimePerTask[1]).toBe(3.75);
  });
});
