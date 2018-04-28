import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import CreateProject from '@/components/CreateProject.vue';
import Router from 'vue-router';

const router = new Router();
const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      post: function(host, token, name, description, success, error){
        if(name.trim().length && description.trim().length) {
          let response = {
            data:{
              id: 1,
              name: name,
              description: description,
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
      }
    }
  };
});

import { apiProjects } from '@/api/projects';

describe('CreateProject.vue', function() {
  let wrapper = shallow(CreateProject, { localVue, store, router });

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

  it('can submit correct form', function () {
    wrapper.setData({
      name: 'test1234',
      description: 'test test 1 2 3 4',
    });
    wrapper.find('form').trigger('submit');
    expect(wrapper.vm.$router.history.current.path).toBe('/projects');
  });
});
