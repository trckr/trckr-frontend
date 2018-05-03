import { createLocalVue, shallow, RouterLinkStub } from '@vue/test-utils';
import { store } from '@/store';
import Projects from '@/components/Projects.vue';

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

import { apiProjects } from '@/api/projects';

describe('Projects.vue', function() {
  let wrapper = shallow(Projects, {localVue, store, mocks: { $router, $route }, stubs: { RouterLink: RouterLinkStub }});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Shows all the projects', function() {
    expect(wrapper.vm.filteredProjects[0].name).toBe('test 1');
    expect(wrapper.vm.filteredProjects[1].name).toBe('test 2');
    expect(wrapper.vm.filteredProjects[2].name).toBe('test 3');
  });

  it('Filters correctly', function() {
    wrapper.setData({
      search: '3',
    });

    expect(wrapper.vm.filteredProjects.length).toBe(1);
    expect(wrapper.vm.filteredProjects[0].name).toBe('test 3');
  });

  it('Hides all projects if no project matches', function() {
    wrapper.setData({
      search: '4',
    });

    expect(wrapper.vm.filteredProjects.length).toBe(0);
  });
});
