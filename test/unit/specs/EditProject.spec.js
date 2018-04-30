import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import EditProject from '@/components/EditProject.vue';

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
        getSingle: function (host, token, projectId, success, error) {
          let response = {
            data:{
              id: 1,
              name: 'proj 1',
              description: 'this is stock',
            },
          };
          success(response);
        },
        put: function (host, token, projectId, name, description, success, error) {
          if(name.trim().length && description.trim().length){
            let response = {
              data:{
                id: 1,
                name: 'edited proj 1',
                description: 'this has been edited',
                modifiedDate: '2018-04-19T16:54:07.677763Z',
                createdDate: '2018-04-19T16:54:07.677717Z',
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
  }
);

import { apiProjects } from '@/api/projects';

describe('EditProject.vue', function() {
  let wrapper = shallow(EditProject, {localVue, store, mocks: { $router, $route }});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('cannot submit empty form', function () {
    wrapper.setData({
      name: ' ',
      description: ' ',
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.find('.message--error').exists()).toBeTruthy();
  });

  it('can submit a correct form', function () {
    wrapper.setData({
      name: 'edited proj 1',
      description: 'this has been edited',
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.vm.$router.path).toBe('/project/1');
  });
});
