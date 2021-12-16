const t = require('./lib/shtml.js'); // Templating engine

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let html = t.render('./src/index.html', {name: 'Your name', surname: 'Your surname'});
    res.send(html);
});

app.get('/:name/:id', function (req, res) {
    let html = t.render('./src/index.html', {name: req.params.name, surname: req.params.id});
    res.send(html);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})