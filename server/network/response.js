"use strict";

const statusMessages = {
  "200": "OK",
  "201": "Created",
  "400": "Bad Request",
  "404": "Not Found",
  "500": "Internal Server Error"
};

const success = (req, res, body, status=200) => { 
  res.status(status)
  .send({
    error: null,
    body: body || statusMessages[status]
  });
};

const error = (req, res, error, status=500, error_details) => { 
  console.error("[LOG_ERROR_DETAILS]:", error_details);

  res.status(status)
  .send({
    error: error || statusMessages[status],
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