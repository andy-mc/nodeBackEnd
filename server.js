const express = require('express');
const favicon = require('serve-favicon')
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(favicon(path.join(__dirname, 'public', 'pikachu.ico')))

app.get("/", (req, res) => {
    res.status(200)
    .send("Hello World");
});

app.get("*", (req, res) => {
  res.status(404)
  .send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
