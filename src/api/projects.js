import axios from 'axios';

export const apiProjects = {
  post: function(host, name, description, token, success, error) {
    axios.post(host + '/api/projects/', {
      name: name,
      description: description,
    }, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },

  getAllProjects: function (host, token, success, error) {
    axios.get(host + '/api/projects/', {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },

  getOne: function (host, projectId, token, success, error) {
    axios.get(host + '/api/projects/' + projectId, {
      headers: {
        'Authorization': 'Token ' + token
      }
    }).then(success).catch(error);
  },

  edit: function (host, projectid, name, description, token, success, error) {
    axios.put(host + '/api/projects/' + projectid + '/',
      {
        name: name,
        description: description,
      },{
        headers: {
          'Authorization': 'Token ' + token
        }
    }).then(success).catch(error);
  }


};
