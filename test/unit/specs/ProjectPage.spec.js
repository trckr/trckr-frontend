import { createLocalVue, shallow, RouterLinkStub } from '@vue/test-utils';
import { store } from '@/store';
import ProjectPage from '@/components/ProjectPage.vue';

const localVue = createLocalVue();

const $route = { params: { projectId: 1 }};
const $router = {
  path: '',
  push: function(string) {
    this.path = string
  }
};

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getSingle: function(host, token, projectId, success, error) {
        let response = {
          data: {
            id: 1,
            name: 'test 1',
            description: 'this is test proj 1',
            modifiedDate: '2018-04-19T16:54:07.677763Z',
            createdDate: '2018-04-19T16:54:07.677717Z',
          },
        };
        success(response);
      }
    },
  };
});

jest.mock('@/api/tasks', function() {
  return {
    apiTasks:{
      getAll: function (host, token, projectId, success, error) {
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

import { apiProjects } from '@/api/projects';
import { apiTasks } from '@/api/tasks';

describe('ProjectPage.vue', function() {
  let wrapper = shallow(ProjectPage, {localVue, store, mocks: { $router, $route }, stubs: { RouterLink: RouterLinkStub }});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('displays the title correctly', function() {
    expect(wrapper.find('h1').text()).toBe('test 1');
  });

  it('displays the description correctly', function() {
    expect(wrapper.find('p').text()).toBe('this is test proj 1');
  });

  it('displays all tasks of the project correctly', function() {
    expect(wrapper.find('tbody').text()).toBe('first test task foosecond test task bar')
  });
});
