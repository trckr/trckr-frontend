import axios from 'axios';

export const apiTimeEntries = {
  post: function(host, token, description, timeSpent, taskId, success, error) {
    axios.post(host + '/api/time-entries/', {
      description: description,
      timeSpent: timeSpent,
      task: taskId,
    }, {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  getAll: function (host, token, success, error) {
    axios.get(host + '/api/time-entries/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
};
