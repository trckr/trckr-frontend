import axios from 'axios';

export const apiTasks = {
  post: function(host, name, description, project, token, success, error) {
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

  getAllTasks: function (host, project, token, success, error) {
    axios.get(host + '/api/projects/' + project + '/tasks', {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },

  getOne: function (host, task, token, success, error) {
    axios.get(host + '/api/tasks/' + task, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  }

};
