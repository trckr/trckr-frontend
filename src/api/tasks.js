import axios from 'axios';

/**
 * This module takes care of the api calls to the backend concerning the '/api/tasks/' url.
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiTasks.post, getAll: apiTasks.getAll, getAllByProject: apiTasks.getAllByProject, getSingle: apiTasks.getSingle}}
 */
export const apiTasks = {
  post: function(host, token, name, description, projectId, success, error) {
    axios.post(host + '/api/tasks/', {
        name: name,
        description: description,
        project: projectId,
      },{
        headers: {
          'Authorization': 'Token ' + token,
        }}
    ).then(success).catch(error);
  },
  getAll: function (host, token, success, error) {
    axios.get(host + '/api/tasks/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getAllByProject: function (host, token, projectId, success, error) {
    axios.get(host + '/api/projects/' + projectId + '/tasks/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getSingle: function (host, token, taskId, success, error) {
    axios.get(host + '/api/tasks/' + taskId + '/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
};
