import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import ProjectPage from '@/components/ProjectPage.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getOne: function (host, projectId,token, success, error) {
        //TODO: what 'if statement' to use?
        if(true) {
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

jest.mock('@/api/tasks', function() {
  return {
    apiTasks:{
      getAllTasks: function(host, project, token, success, error){
        //TODO: what 'if statement' to use?
        if(true){
          let response = {
            data:[
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
          }
        }
      }
    }
  }
});

import { apiProjects } from '@/api/projects';
import { apiTasks } from '@/api/tasks';

describe('ProjectPage.vue', function() {
  let wrapper = shallow(ProjectPage, {localVue, store});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

});
