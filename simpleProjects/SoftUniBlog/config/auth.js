module.exports = {
    isAuthed: (req, res, next) => {
        console.log('isAuthed')
        console.log(req.user)
        if (req.user) {// проверка дали си аутентикиран
            console.log('if isAuthed')
            next();
        } else {
            console.log('else isAuthed')
            res.redirect('/login');
        }
    },
    hasRole: (role) => (req, res, next) => {
        if (req.user &&
            req.user.roles.indexOf(role) > -1) {
            next();
        } else {
            res.redirect('/login');
        }
    },
    isAnonymous: (req, res, next) => {//ако нямаме user
        console.log('isAnonymous');
        if (!req.user) {
            console.log('isAnonymous if');
            next();
        } else {
            res.redirect('/');
        }
    }
}