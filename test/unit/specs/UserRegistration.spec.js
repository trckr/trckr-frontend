import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import UserRegistration from '@/components/UserRegistration.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/user', function() {
  return {
    apiUser: {
      post: function(host, username, email, password, first_name, last_name, success, error) {
        if (username.trim().length && email.trim().length && password.trim().length && first_name.trim().length && last_name.trim().length) {
          let response = {
            data: {
              id: 1,
              username: username,
              email: email,
              first_name: first_name,
              last_name: last_name,
              token: 'secret-token',
            },
          };

          success(response);
        } else {
          let response = {
            data: {
              non_field_errors: ['Something went wrong.'],
            },
          };

          error(response);
        }
      },
    },
  };
});

import { apiUser } from '@/api/user';

describe('UserRegistration.vue', function() {
  let wrapper = shallow(UserRegistration, { localVue, store });

  beforeEach(function() {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Cannot submit an empty form', function() {
    wrapper.find('form').trigger('submit');
    expect(localStorage.length).toBe(0);
    expect(wrapper.find('.message--error').exists()).toBeTruthy();
  });

  it('Can register a new user', function() {
    wrapper.setData({
      username: 'jest',
      password: 'unit-testing',
      email: 'test@test.ch',
      first_name: 'first name',
      last_name: 'last name',
    });
    wrapper.find('form').trigger('submit');

    expect(localStorage.trckrCurrentUser).toBe('{"username":"jest","token":"secret-token"}');
  });
});
