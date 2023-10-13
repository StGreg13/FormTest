const express = require('express')
const app = express()
const fs = require('fs');

let data;

app.listen(5000, () => {
  console.log("Server started on port 5000")
})

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

fs.readFile('./data/users.json', 'utf8', (err, jsonData) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }
  data = JSON.parse(jsonData);
  console.log('Данные из users.json загружены.');
});

app.get('/search', (req, res) => {
  const { email, number } = req.query;
  setTimeout(() => {
    const result = data.filter(item => {
      return item.email.indexOf(email) > -1 && item.number.indexOf(number) > -1
    })
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: "Объект не найден" });
    }
  }, 5000);
});