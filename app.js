const express = require('express');
const stripe = require('stripe')('sk_test_ioTZDyEGLN1Fu67Gcpum5DeJ');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const twig = require('twig');

const app = express();

//Handelbars Middelware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//set static folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});
// route success
//app.get('/success', (req, res) => {
//    res.render('success');
//});

// charger la Route
app.post('/charge', (req, res) => {
    const amount = 2550;
    //console.log(req.body);
    //res.send('TEST STRIPE');
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'Developpement web stripe api',
        currency:'Eur',
        customer:customer.id
    }))
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});