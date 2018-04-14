import { shallow } from '@vue/test-utils';
import UserRegistration from '../src/components/UserRegistration.vue';

describe('UserRegistration.vue', function() {
  it('Testing UserRegistration', function() {
    const wrapper = shallow(UserRegistration);
    const message = wrapper.find('h1').text();

    expect(message).toBe('User registration');
  })
});
