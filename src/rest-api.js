// * You may uncomment one of these modules:
const express = require('express');
//const koa = require('koa');
//const hapi = require('@hapi/hapi');
//const restify = require('restify');

module.exports = (stepService) => {
  const REST_PORT = 8080;
  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server
  const app = express();

  app.get('/steps/:username', (req, res) => {
    const { username } = req.params;
    const stepData = stepService.get(username);

    if (!stepData) {
      res.status(404).send(`User ${username} not found.`);
    } else {
      res.send({ username, cumulativeSteps: stepData.cumulativeSteps });
    }
  });

  const server = app.listen(REST_PORT, () => {
    console.log(`Server listening on port ${REST_PORT}.`);
  });

  return {
    close: () => server.close(),
  };
};
