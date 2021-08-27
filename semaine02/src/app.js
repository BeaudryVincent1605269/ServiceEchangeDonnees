import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(777);
    res.set('Content-Type', 'text/plain');
    res.send('Notre première route express');
});

app.get('/maths/somme', (req, res) => {

    //console.log(req.query);
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    const somme = a + b;

    res.status(777);
    res.set('Content-Type', 'text/html');
    res.send(`<b>${somme}</b>`);

})

export default app;