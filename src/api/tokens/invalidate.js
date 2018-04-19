import axios from 'axios';

export const apiTokensInvalidate = {
  post: function(host, token, success, error) {
    axios.post(host + '/api/tokens/invalidate/', {}, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },
};
