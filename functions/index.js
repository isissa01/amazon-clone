if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.key);

//API


//App config
const app = express();

//Middlewares
app.use(cors({origin: true}));
app.use(express.json());

//API Routes
app.get('/', (req, res) =>{
    res.status(200).send("Hello World");
});

app.post('/payments/create', async (req, res) =>{
    const total = req.query.total;

    console.log("Payment request recieved amount of: ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: 'usd',
    });
    //Ok -Created 
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,

    });
});

//Listen Command
exports.api = functions.https.onRequest(app);