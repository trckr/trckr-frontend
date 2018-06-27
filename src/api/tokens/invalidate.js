import axios from 'axios';

/**
 * This module takes care of the api calls to invalidate the auth token after a logout
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiTokensInvalidate.post}}
 */
export const apiTokensInvalidate = {
  post: function(host, token, success, error) {
    axios.post(host + '/api/tokens/invalidate/', {}, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },
};
