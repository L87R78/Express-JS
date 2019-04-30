const encryption = require('../util/encryption');
const User = require('../models/User');
const Car = require('../models/Car');
const Rent = require('../models/Rent');


module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
       console.log('registerPOST');
       const userBody = req.body;
  
        if(!userBody.username || !userBody.password  || !userBody.repeatPassword){
            userBody.error = 'Please fill all fields!';
            res.render('user/register', userBody);
            return;
            }
        if(userBody.password !== userBody.repeatPassword){
            userBody.error = 'Both password should match!';
            res.render('user/register', userBody);
            return;
        }
        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, userBody.password);
        try {
            const user = await User.create({        //create User
                username: userBody.username,
                hashedPass,
                salt,
                firstname: userBody.firstName,
                lastname: userBody.lastName,
                roles: ['User']
            });
            
            req.logIn(user, (err) => {//идва от passport -> passport.serializeUser((user, done)
                if(err){
                    userBody.error = error;
                    res.render('user/register', userBody);
                }else{
                    res.redirect('/');
                    return;
                }
            })
        }catch(err){
                console.log('inside in register catch');
                console.log(err);
        }
        
    },
    logout: (req, res) => {
        req.logout(); //изчиства сесията
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const userBody = req.body;

        const user = await User.findOne({ username: userBody.username});
        //console.log(user)
    
        try {
            if(user === null){    
                userBody.error = "UserName is Invalid!";
                res.render('user/login', userBody);
                return;
            }
            if(!user.authenticate(userBody.password)){ //пращаме паролата от формтата за въвеждане
                userBody.error = 'Password is Invalid!';
                res.render('user/login', userBody);
                return;
            }
            req.logIn(user, (err) => {  
                if(err){
                    userBody.error = error;
                    res.render('user/login', userBody);
                    return;
                }else{
                    console.log(req.user.username)
                    res.redirect('/');
                    return;
                }
            })
        } catch(err){
            userBody.error = 'Something went wrong loginPost';
            //console.log(err);
            res.render('user/login', userBody);
        }
    },
    myRents: (req, res) => {
       const userId = req.user._id; // това идва от passport
       console.log(userId);
       
       //взимане на информация от една схема да заредим информация за друга схема
       Rent.find({owner: userId}) 
                .populate('car')
                .then((rents) => {
                    let cars = [];
                    for(let rent of rents){
                        rent.car.expiresOn = `In ${rent.days} days.`;
                        cars.push(rent.car);
                    }
                    res.render('user/rented', { cars });
                })
                .catch(err => {
                    console.log("Something went wrong in MyRents");
                    console.log(err);
                });
    }
};