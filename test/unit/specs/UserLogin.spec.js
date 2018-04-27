import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import { apiTokensInvalidate } from '@/api/tokens/invalidate';
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

jest.mock('@/api/tokens/invalidate', function() {
  return {
    apiTokensInvalidate: {
      post: function(host, token, success, error) {
        // We only need to callback success as we don't test any network errors on logging out.
        let response = {
          data: 'success',
        };

        success(response);
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

  it('Testing Logout', function() {
    // First, check if we're still logged in.
    expect(localStorage.length).not.toBe(0);

    apiTokensInvalidate.post(
      '',
      'secret-token',
      function(response) {
        if (response.data === 'success') {
          store.dispatch({
            type: 'logout',
          });
        }
      }
    );

    // Secondly, check if we're logged out.
    expect(localStorage.trckrCurrentUser).toBe('{}');
  });
});
