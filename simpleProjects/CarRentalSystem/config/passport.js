const passport = require('passport');
const LocalPassport = require('passport-local');//Strategy
const User = require('mongoose').model('User');

                //passport  разчита на сесии и се слага след тях

module.exports = () => {
                        //даваме нашите Credentials
                        //Strategy може да е locals, Google, Facebook
    passport.use(new LocalPassport((username, password, done) => { //Strategy   //тази стратегия примерно връща true or false
                                                        //done е Callback
        //тук може да се логваме и с email не само с username
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);


            //тук вече всичко е минало добре и взимаме в този случай username и password на потребителя
            //тук вече serialize function взима ID-то на този потребител и го праща към session
            return done(null, user);
        });
    }));

    //след успешна автентикация
    passport.serializeUser((user, done) => {
        if (user) return done(null, user._id);//запазваме в session само неговото id, което създава нашето cookie
                                            //може да запазваме и други неща
    });

    passport.deserializeUser((id, done) => {
        //взимане от session id-то и закача user-a към req(user-a във себе си има всичката информация- id, password, hash, password)
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);     
            //към req всеки път когато имаме (req, res) в екшаните   закача req.user(той има абсолютно цялата ингормация за себе си)
            //само на сървърно ниво го имаме
        });
    });
    //passporta e middleware грижи се да вкара информация за user-a
};