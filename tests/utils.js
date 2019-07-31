const { del } = require("../db.js");

function cleanup(ids, errr, res, done) {
  return del(ids)
    .then((result) => {
      if(errr){
        done(errr);
      } else {
        done();
      }
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
}

module.exports = {
  cleanup
};
