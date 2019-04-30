const router = require('express').Router();
router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/login', (req, res) => {
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