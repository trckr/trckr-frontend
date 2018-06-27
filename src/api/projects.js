import axios from 'axios';

/**
 * This module takes care of the api calls to the backend concerning the '/api/projects/' url.
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiProjects.post, getAll: apiProjects.getAll, getSingle: apiProjects.getSingle, put: apiProjects.put}}
 */
export const apiProjects = {
  post: function(host, token, name, description, success, error) {
    axios.post(host + '/api/projects/', {
      name: name,
      description: description,
    }, {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getAll: function (host, token, success, error) {
    axios.get(host + '/api/projects/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getSingle: function (host, token, projectId, success, error) {
    axios.get(host + '/api/projects/' + projectId + '/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  put: function (host, token, projectId, name, description, success, error) {
    axios.put(host + '/api/projects/' + projectId + '/', {
      name: name,
      description: description,
    },{
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
};
