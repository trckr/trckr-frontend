import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import CreateTask from '@/components/CreateTask.vue';

const localVue = createLocalVue();

const $route = { params: { projectId: 1 }};
const $router = {
    path: '',
    push: function(string) {
        this.path = string
    }
};

jest.mock('@/api/tasks', function() {
  return {
    apiTasks:{
      post: function (host, token, name, description, project, success, error) {
        if(name.trim().length && description.trim().length){
          let response = {
            data:{
              id: 1,
              name: 'test task 1',
              description: 'this is test task 1',
              projectId: 1,
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
      }
    }
  }
});

import { apiTasks } from '@/api/tasks';

describe('CreateTask.vue', function () {
  let wrapper = shallow(CreateTask, {localVue, store, mocks: { $router, $route }});

  beforeEach(function() {
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

  it('can create a correct task and redirect', function() {
    wrapper.setData({
      name: 'test task 1',
      description: 'this is test task1',
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.vm.$router.path).toBe('/project/1');
  });
});
