import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import ProjectPage from '@/components/ProjectPage.vue';
import Router from 'vue-router';

const router = new Router();
const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getSingle: function(host, token, projectId, success, error) {
        //TODO: what to check for
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
    },
  };
});

//TODO: this mocked function is not called ??
jest.mock('@/api/tasks', function() {
  return {
    apiTasks:{
      getAll: function (host, token, projectId, success, error) {
        //TODO: what to check for
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
  let wrapper = shallow(ProjectPage, { localVue, store, router });

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
    //TODO: table is currently empty, because mocked get all tasks is never called
    //expect(wrapper.find('#table--project-task').html()).toBe('')
  });
});
