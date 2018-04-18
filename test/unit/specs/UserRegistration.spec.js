import { shallow } from '@vue/test-utils';
import Vue from 'vue'
import Router from 'vue-router';
import UserRegistration from '@/components/UserRegistration.vue';

Vue.use(Router);

describe('UserRegistration.vue', function() {
  it('Testing UserRegistration', function() {
    const wrapper = shallow(UserRegistration);
    const message = wrapper.find('h1').text();

    expect(message).toBe('User registration');
  })
});
