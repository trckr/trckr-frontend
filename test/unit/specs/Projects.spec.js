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

  it('shows all the projects', function(){
    expect(wrapper.find('tbody').text()).toBe('test 1 this is test 1test 2 this is test 2test 3 this is test 3')
  });

  it('shows the search result', function(){
    if( Projects.data.name.match(this.search)== "3"){
      expect(wrapper.find('tbody').text()).toBe('test 3 this is test 3');
      }
  });
});
