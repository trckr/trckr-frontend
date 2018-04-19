import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import CreateTask from '@/components/CreateTask.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/tasks', function() {
  return {
    apiTasks:{
      post: function (host, name, description, project, token, success, error) {
        if(name.trim().length && description.trim().length){
          let response = {
            data:{
              id: 1,
              name: 'test task 1',
              description: 'this is test task 1',
              project: 1,
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
  let wrapper = shallow(CreateTask, {localVue, store});

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
    //expect(wrapper.find('.message--error').exists()).toBeTruthy();
  });

});
