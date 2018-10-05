const express = require('express');
const app = express();

// Logging unhandled promises rejection
process.on('unhandledRejection', (reason, p) => {
  console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});


app.use(`/`, require('./routes'));

app.listen(3000, () => {
 console.debug(`SWEDA ${app.name} listening on port 3000`);
});
