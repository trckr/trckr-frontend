import axios from 'axios';

/**
 * This module takes care of the api calls to the backend concerning the '/api/time-entries/' url.
 *
 * The calls and their return values are described in the technical documentation on github:
 * https://github.com/trckr/trckr-documentation/blob/master/doc/technical/implementation/api.md
 * @type {{post: apiTimeEntries.post, put: apiTimeEntries.put, getAll: apiTimeEntries.getAll, getSingle: apiTimeEntries.getSingle}}
 */
export const apiTimeEntries = {
  post: function(host, token, description, timeSpent, taskId, date, success, error) {
    axios.post(host + '/api/time-entries/', {
      description: description,
      timeSpent: timeSpent,
      task: taskId,
      startTime: date,
    }, {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
  put: function(host, token, timeEntryId, description, timeSpent, taskId, date, success, error) {
    axios.put(host + '/api/time-entries/' + timeEntryId + '/', {
      description: description,
      timeSpent: timeSpent,
      task: taskId,
      startTime: date,
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
  getSingle: function (host, token, timeEntryId, success, error) {
    axios.get(host + '/api/time-entries/' + timeEntryId + '/', {
      headers: {
        'Authorization': 'Token ' + token,
      }
    }).then(success).catch(error);
  },
};
