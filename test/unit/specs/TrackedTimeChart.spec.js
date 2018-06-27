import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import TrackedTimeChart from '@/components/TrackedTimeChart.vue';
import Router from 'vue-router';
import moment from 'moment';

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
            startTime: Date.now(),
            timeSpent: 2.50000,
            task: 1,
            project: 1,
          }, {
            id: 2,
            description: 'Time Entry 2',
            startTime: Date.now(),
            timeSpent: 2.50000,
            task: 2,
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

import { apiTimeEntries } from '@/api/time-entries';

describe('Dashboard.vue', function() {
  let wrapper = shallow(TrackedTimeChart, { localVue, store });

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Canvas is rendered', function() {
    expect(wrapper.find('canvas')).toBeTruthy();
  });

  it('Time entries are grouped by day', function() {
    var currentDate = new moment();
    var currentDay = currentDate.isoWeekday() - 1;
    var trackedTimePerDay = wrapper.vm.chartData.datasets[0].data;

    expect(trackedTimePerDay.length).toBe(7);
    expect(trackedTimePerDay[currentDay]).toBe(5.0);
    expect(trackedTimePerDay[currentDay + 1 % 7]).toBe(0);
  });
});
