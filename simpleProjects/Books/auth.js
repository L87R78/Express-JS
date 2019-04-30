const router = require('express').Router();
console.log('yes yes')
console.log('1')
router.get('/login', (req, res) => {
    console.log('11')
    res.render('login');
    
})
console.log('2')
router.post('/login', (req, res) => {
    console.log('22')
    const {username, password} = req.body;
    if(username === 'pesho' && password === '123'){
        req.session.user = {
            username
        };

        res.redirect('/');
    }else{
        res.redirect('/auth.login');
    }
    
})
module.exports = router;