"use strict";

const success = (req, res, body={}, status=200) => { 
  res.status(status)
  .send({
    error: null,
    body
  });
};

const error = (req, res, error={}, status=404, error_details) => { 
  console.error("[LOG_ERROR_DETAILS]:", error_details);

  res.status(status)
  .send({
    error,
    data: null
  });
};

const html = (req, res, html, status=200) => { 
  res.status(status)
  .send(html);
};

module.exports = {
  success,
  error,
  html
};

// idea to format the response
// {
//   error || success: [true || false],
//   "message": "User logged in successfully || Invalid email or password",
//   "data": { ... },
// }