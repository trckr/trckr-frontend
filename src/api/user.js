import axios from 'axios';

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
