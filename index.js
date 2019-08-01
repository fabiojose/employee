const app = require("./app.js");

const logger = require("./logger.js");

app.listen(3000, () => {
  logger.debug("Listening on: http://localhost:3000");
});
