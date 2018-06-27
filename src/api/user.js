import axios from 'axios';

/**
 * This module takes care of the api calls to the backend concerning the '/api/user/' url.
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiUser.post}}
 */
export const apiUser = {
  post: function(host, username, email, password, first_name, last_name, success, error) {
    axios.post(host + '/api/user/', {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }).then(success).catch(error);
  },
};
