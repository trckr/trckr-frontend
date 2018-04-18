import { createLocalVue, shallow } from '@vue/test-utils';
import { store } from '@/store';
import UserLogin from '@/components/UserLogin.vue';
import Router from 'vue-router';

const localVue = createLocalVue();
localVue.use(Router);

jest.mock('@/api/token-auth', function() {
  return {
    tokenAuth: {
      post: function(username, password, success, error) {
        let response = {
          data: {
            token: 'secret-token',
          }
        };
        success(response);
      },
    },
  };
});

describe('UserLogin.vue', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(UserLogin, { localVue, store });
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('Testing UserLogin', function() {
    wrapper.find('#username').element.value = 'admin';
    wrapper.find('#password').element.value = '1234';
    wrapper.find('form').trigger('submit');
  })
});
