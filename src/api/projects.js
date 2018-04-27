import axios from 'axios';

export const apiProjects = {
  post: function(host, token, name, description, success, error) {
    axios.post(host + '/api/projects', {
      name: name,
      description: description,
    }, {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getAll: function (host, token, success, error) {
    axios.get(host + '/api/projects', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getSingle: function (host, token, projectId, success, error) {
    axios.get(host + '/api/projects/' + projectId, {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  put: function (host, token, projectId, name, description, success, error) {
    axios.put(host + '/api/projects/' + projectId, {
      name: name,
      description: description,
    },{
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
};
