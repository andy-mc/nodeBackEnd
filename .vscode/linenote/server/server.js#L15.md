<<<<<<<<NM>>>>>>>>

// When this option is true, client errors such as a bad request or a request to a non-existent file will cause this middleware to simply call next() to invoke the next middleware in the stack. When false, these errors (even 404s), will invoke next(err).