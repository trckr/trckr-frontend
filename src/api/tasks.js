import axios from 'axios';

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
  getAll: function (host, token, projectId, success, error) {
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
