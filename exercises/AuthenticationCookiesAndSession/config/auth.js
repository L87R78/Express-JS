// const router = require('express').Router();

// router.get('/login', (req, res) => {
//     console.log('зареждане на login страницата');
//     res.render('login', { inputData: req.session.inputData })
// });

// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     console.log('попълване на данни в user формата');
//     if (username === 'lubo' && password === '123') {
//         console.log('правилен user');
//         req.session.user = {
//             username
//         }
//         res.redirect('/')
//     } else {
//         console.log('neправилен user');
//         req.session.inputData = {
//             username,
//             password
//         }
//         //console.log(req.session.inputData)
//         res.redirect('/')
        
//     }
// });
// module.exports = router