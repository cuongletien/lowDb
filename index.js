const express = require('express');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const app = express();
const port = 3000;

const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ todos: [] })
    .write()
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => res.render('index', { title: 'Hey', message: 'Hello Cuong!' }));

app.get('/todos', (req, res) => res.render('todos/index', { todos: db.get('todos').value() }));

app.get('/todos/search', (req, res) => {
    let valueQuery = req.query.q;
    let matchedUsers = db.get('todos').value().filter(item => item.name.indexOf(valueQuery) !== -1);
    res.render('todos/index', {
        todos: matchedUsers
    });
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));