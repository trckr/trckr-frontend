import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import Projects from '@/components/Projects.vue';
import Router from 'vue-router';

const router = new Router();
const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getAll: function (host, token, success, error) {
        //TODO: what to check for
        if(host != '') {
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

describe('Projects.vue', function() {
  let wrapper = shallow(Projects, {localVue, store, router});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('shows all the projects', function(){
    expect(wrapper.find('tbody').text()).toBe('this is test 1 this is test 2 this is test 3')
  });
});
