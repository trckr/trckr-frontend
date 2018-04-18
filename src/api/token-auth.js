import axios from 'axios';

export const tokenAuth = {
  post: function(username, password, success, error) {
    axios.post('https://trckr-api.trvlr.ch' + '/api/token-auth/', {
      username: username,
      password: password,
    }).then(success).catch(error);
  },
};
