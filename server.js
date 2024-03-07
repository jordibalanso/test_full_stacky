const
    express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(express.static(path.join(__dirname, './build')));

app.set('view-engine', 'ejs');
app.set("trust proxy", 1);
app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());

app.get('', (_, res) => {
    res.json('server listening :S');
});

const randomTime = () => new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 1000)));

app.get('/home', async (_, res) => {
    await randomTime();
    res.status(200).json('abcdefg'.split('').map((a, id) => ({id: id+1, name: a})))
});

app.get('/contact', async (_, res) => {
    await randomTime();
    res.status(200).json('im a contact response from the server :S');
});

app.get('/settings', async (_, res) => {
    await randomTime();
    res.status(200).json('settings from the server? :o');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`example app listening on port ${port}`));