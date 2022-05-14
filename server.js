const express = require('express');
const router = express.Router();
const favicon = require('serve-favicon')
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(router)
app.use(favicon(path.join(__dirname, 'public', 'pikachu.ico')))

router.get("/", (req, res) => {
  res.status(200)
  .send("Root");
});

router.get("/home", (req, res) => {
  res.status(200)
  .send("GET Home");
});

router.post("/home", (req, res) => {
  res.status(200)
  .send("POST Home");
});

app.use((req, res) => {
  res.status(404)
  .send("<h1>404 page not found on Server :( !!</h1>")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('uncaughtException', (errors) => {
  console.error('uncaughtException');
  console.error(errors);
  process.exit(1);
});

process.on('unhandledRejection', (errors) => {
  console.error('unhandledRejection');
  console.error(errors);
  process.exit(1);
});
