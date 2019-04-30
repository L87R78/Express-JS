module.exports = {
    isAuthed: (req, res, next) => { 
        console.log('isAuthed');
        if (req.isAuthenticated) { //ако сме се логнали покажи какво и т.н....
            next();
        } else {
            res.redirect('/user/login'); //ако НЕ сме се логнали покажи какво и т.н....
        }
    },
    hasRole: (role) => (req, res, next) => {
        console.log('hasRole');
        const currentRoles = req.user.roles.toString();
        console.log(currentRoles);
        
        if(currentRoles === 'User'){
            next();
        }else{
            res.redirect('/user/login');
        }
        
        // if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        //     next();
        // } else {
        //     res.redirect('/user/login');
        // }
    },
   
    isAnonymous: (req, res, next) => { 
        if (!req.isAuthenticated()) { //ако не сме се логнали извикваме следващия handler
            next();
        } else {
            res.redirect('/'); //ако сме се логнали извикваме следващия handler 
        }
    }
};