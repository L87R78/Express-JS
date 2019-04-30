let products = [
    {
        name: 'Apple',
        cost: 43
    },
    {
        name: 'Orange',
        cost: 23
    },
    {
        name: 'Banana',
        cost: 11
    },
    {
        name: 'Lemon',
        cost: 56
    },
    {
        name: 'Pomelo',
        cost: 78
    },
]

//const router = require('express').Router();

module.exports = {
    home: (req, res) => {
        //const username = req.session.user.username;
        let numItem = req.session.cart;  //правиме >Items in Cart: 0
        if (numItem === undefined) {
            numItem = 0;
        } else {
            numItem = req.session.cart.length
        }
        res.render('index', { products, numItem})
    },
    add: (req, res) => {
        if (req.session.cart === undefined) {
            req.session.cart = [];
        }
        const product = products[Number(req.params.id)];
        // console.log(req.params.id)
        //console.log(product)
        req.session.cart.push(product);
        res.redirect('/');
    },
    myCarts: (req, res) => {
        const myProducts = req.session.cart || [];
        let sumCost = myProducts.reduce((a, b) => +a + +b.cost, 0);
        const myProductsLength = myProducts.length
        res.render('carts', { myProducts, myProductsLength, sumCost })
    },
    delete: (req, res) => {
        console.log('delete')
        const myProducts = req.session.cart || [];
        const id = Number(req.params.id);
        req.session.cart = myProducts.filter((p, i) => i != id);
        res.redirect('/myCarts')
    },
    login: (req, res) => {
        res.render('login')
    },
    readSession: (req, res) => {
        console.log('readSession')
        res.json(req.session)
    },
    error: (req, res) => {
       res.write("<h1>Opppppppppppppp's :(</h1>");
    },
    
}


