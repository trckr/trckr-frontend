import { createLocalVue, shallow, RouterLinkStub } from '@vue/test-utils';
import { store } from '@/store';
import TimeEntryForm from '@/components/TimeEntryForm.vue';

const localVue = createLocalVue();

const $route = { params: {} };
const $routeEdit = { params: { timeEntryId: 1 } };
const $router = {
  path: '',
  push: function(string) {
    this.path = string
  }
};

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getAll: function (host, token, success, error) {
        let response = {
          data: [
            {
              id: 1,
              name: 'test 1',
              description: 'this is test 1',
              modifiedDate: '2018-04-19T16:54:07.677763Z',
              createdDate: '2018-04-19T16:54:07.677717Z',
            }, {
              id: 2,
              name: 'test 2',
              description: 'this is test 2',
              modifiedDate: '2018-04-19T16:54:07.677763Z',
              createdDate: '2018-04-19T16:54:07.677717Z',
            }, {
              id: 3,
              name: 'test 3',
              description: 'this is test 3',
              modifiedDate: '2018-04-19T16:54:07.677763Z',
              createdDate: '2018-04-19T16:54:07.677717Z',
            },]
        };
        success(response);
      }
    }
  }
});

jest.mock('@/api/tasks', function() {
  return {
    apiTasks: {
      getAll: function (host, token, success, error) {
        let response = {
          data: [
            {
              id: 1,
              name: 'first test task',
              description: 'foo',
              project: 1,
            },
            {
              id: 2,
              name: 'second test task',
              description: 'bar',
              project: 1
            },
          ]
        };
        success(response);
      }
    }
  }
});

jest.mock('@/api/time-entries', function() {
  return {
    apiTimeEntries: {
      getSingle: function (host, token, timeEntryId, success, error) {
        let response = {
          data: {
            id: 1,
            description: 'description',
            timeSpent: 1.00000,
            task: 1,
            project: 1,
            startTime: '2000-01-01T00:00:00',
          },
        };
        success(response);
      },
      post: function(host, token, description, timeSpent, taskId, date, success, error) {
        if (description.length && timeSpent > 0 && taskId > 0) {
          let response = {
            data: {
              id: 1,
              description: description,
              timeSpent: timeSpent,
              task: taskId,
              project: 1,
              startTime: '2000-01-01T00:00:00',
            },
          };
          success(response);
        } else {
          let response ={
            data: {
              non_field_errors: ['Something went wrong.'],
            },
          };
          error(response);
        }
      },
      put: function(host, token, timeEntryId, description, timeSpent, taskId, date, success, error) {
        if (description.length && timeSpent > 0 && taskId > 0) {
          let response = {
            data: {
              id: 1,
              description: description,
              timeSpent: timeSpent,
              task: taskId,
              project: 1,
              startTime: '2000-01-01T00:00:00',
            },
          };
          success(response);
        } else {
          let response ={
            data: {
              non_field_errors: ['Something went wrong.'],
            },
          };
          error(response);
        }
      },
    }
  }
});

import { apiTimeEntries } from '@/api/time-entries';
import { apiProjects } from '@/api/projects';

describe('TimeEntryForm.vue - Create', function() {
  let wrapper = shallow(TimeEntryForm, {localVue, store, mocks: { $router, $route }, stubs: { RouterLink: RouterLinkStub }});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Can not submit empty form', function() {
    wrapper.setData({
      timeSpent: 0,
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.find('.message--error').exists()).toBeTruthy();
  });

  it('Can create a time entry and redirect', function() {
    wrapper.setData({
      description: 'Description',
      timeSpent: 8.25,
      taskId: 1,
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.vm.$router.path).toBe('/time-entries');
  });
});

describe('TimeEntryForm.vue - Update', function() {
  let wrapper = shallow(TimeEntryForm, {localVue, store, mocks: { $router: $router, $route: $routeEdit }, stubs: { RouterLink: RouterLinkStub }});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Has by default the existing date', function() {
    expect(wrapper.vm.date).toBe('2000-01-01');
  });

  it('Can update a time entry and redirect', function() {
    wrapper.setData({
      description: 'Description',
      timeSpent: 8.25,
      taskId: 1,
      date: '2018-01-01',
    });
    wrapper.find('form').trigger('submit');

    expect(wrapper.vm.date).toBe('2018-01-01');
    expect(wrapper.vm.$router.path).toBe('/time-entries');
  });
});
