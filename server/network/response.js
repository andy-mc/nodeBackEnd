"use strict";

const success = (req, res, data={}, status=200) => { 
  res.status(status)
  .send({
    error: null,
    data
  });
};

const error = (req, res, error={}, status=404) => { 
  res.status(status)
  .send({
    error,
    data: null
  });
};

module.exports = {
  success,
  error
};
