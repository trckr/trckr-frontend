import axios from 'axios';

export const apiTasks = {
  post: function(host, token, name, description, project, success, error) {
    axios.post(host + '/api/tasks/', {
        name: name,
        description: description,
        project: project,
      },{
        headers: {
          'Authorization': 'Token ' + token
        }}
    ).then(success).catch(error);
  },

  getAll: function (host, token, project, success, error) {
    axios.get(host + '/api/projects/' + project + '/tasks', {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },

  getSingle: function (host, token, task, success, error) {
    axios.get(host + '/api/tasks/' + task, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  }

};
