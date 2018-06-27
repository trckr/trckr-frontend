import axios from 'axios';

/**
 * This module takes care of the api calls to the backend concerning the '/api/token-auth/' url.
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiTokenAuth.post}}
 */
export const apiTokenAuth = {
  post: function(host, username, password, success, error) {
    axios.post(host + '/api/token-auth/', {
      username: username,
      password: password,
    }).then(success).catch(error);
  },
};
