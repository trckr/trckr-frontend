import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import UserLogin from '@/components/UserLogin.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/token-auth', function() {
  return {
    apiTokenAuth: {
      post: function(host, username, password, success, error) {
        if (username === 'jest' && password === 'unit-testing') {
          let response = {
            data: {
              token: 'secret-token',
            },
          };

          success(response);
        } else {
          let response = {
            data: {
              non_field_errors: ['Unable to log in with provided credentials.'],
            },
          };

          error(response);
        }
      },
    },
  };
});

describe('UserLogin.vue', function() {
  let wrapper = shallow(UserLogin, { localVue, store });

  beforeEach(function() {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Shows no error message at start', function() {
    expect(wrapper.find('.message--error').exists()).toBeFalsy();
  });

  it('Testing invalid API call [/api/token-auth]', function() {
    wrapper.setData({
      username: 'invalid',
      password: 'login',
    });
    wrapper.find('form').trigger('submit');

    expect(localStorage.length).toBe(0);
    expect(wrapper.find('.message--error').exists()).toBeTruthy();
  });

  it('Testing valid API call [/api/token-auth]', function() {
    wrapper.setData({
      username: 'jest',
      password: 'unit-testing',
    });
    wrapper.find('form').trigger('submit');

    expect(localStorage.trckrCurrentUser).toBe('{"username":"jest","token":"secret-token"}');
  });
});