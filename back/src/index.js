import express from 'express';
const app = express();
const port = 8080;
//USER MANAGEMENT
app.post('/users/register', (req, res) => {
    res.send('placeholder');
});
app.post('/users/login', (req, res) => {
    res.send('placeholder');
});
app.get('/users/auth', (req, res) => {
    res.send('placeholder');
});
app.post('/users/logout', (req, res) => {
    res.send('placeholder');
});
app.get('/users/profile', (req, res) => {
    res.send('placeholder');
});
app.put('/users/profile', (req, res) => {
    res.send('placeholder');
});
//CRYPTOS MANAGEMENT
app.get('/cryptos', (req, res) => {
    res.send('placeholder');
});
app.get('/cryptos/:id', (req, res) => {
    res.send('placeholder');
});
app.post('/cryptos', (req, res) => {
    res.send('placeholder');
});
app.delete('/cryptos', (req, res) => {
    res.send('placeholder');
});
//PRESS MANAGEMENT
app.get('/articles', (req, res) => {
    res.send('placeholder');
});
app.get('/articles/:id', (req, res) => {
    res.send('placeholder');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
