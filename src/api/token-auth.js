import axios from 'axios';

export const apiTokenAuth = {
  post: function(host, username, password, success, error) {
    axios.post(host + '/api/token-auth', {
      username: username,
      password: password,
    }).then(success).catch(error);
  },
};
