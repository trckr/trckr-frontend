import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import Dashboard from '@/components/Dashboard.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/projects', function() {
  return {
    apiProjects: {
      getAll: function (host, token, success, error) {
        //TODO: what 'if statement' to use?
        if(true) {
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

describe('Dashboard.vue', function() {
  let wrapper = shallow(Dashboard, {localVue, store});

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('shows all the projects', function(){
    // router links are somehow not displayed, that's why only description in match
    // TODO: investigate why
    expect(wrapper.find('tbody').text()).toBe('this is test 1 this is test 2 this is test 3')
  });

});
