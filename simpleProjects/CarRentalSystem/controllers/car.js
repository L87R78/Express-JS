const Car = require('../models/Car');
const Rent = require('../models/Rent');


//action
module.exports = {
    addGetCar: (req, res) => {
        console.log('addGetForm');
        res.render('car/add');
    },
    postCar: (req, res) => {
        // Get info from req.body
        // Validate entity
        // Insert into db -> redirect
        console.log('create car at Admin');

        const carBody = req.body;
        carBody.pricePerDay = Number(carBody.pricePerDay);
        Car.create(carBody)
            .then(() => {
                res.redirect('/car/all');
            })
            .catch(err => {
                console.log('Something went wrong with postCar');
                console.log(err);
            });
    },
    allCars: (req, res) => {
        Car.find({ isRented: false })
            .then((cars) => {
                res.render('car/all', { cars });
            })
            .catch(err => {
                console.log(err);
            });
    },
    rentGet: (req, res) => {
        console.log('rentGet');
        const carId = req.params.id; //params защото идва от URL-a

        Car.findById(carId)
            .then((car) => {
                res.render('car/rent', car);
            })
            .catch(err => {
                console.log(err);
            });
    },
    rentPost: async (req, res) => {
        console.log('rentPost');
        const idCar = req.params.id; //id на текущата кола горе в URL-a
        const userId = req.user._id; //id on owner
        const days = Number(req.body.days);

        const obj = {
            car: idCar,
            owner: userId,
            days
        };

        try {
            const rent = await Rent.create(obj);//create car on Rents in mongoDb
            const carById = await Car.findById(idCar);//id-то on current car
            carById.isRented = true;
            await carById.save();

            //put in mongoose rents array on current user
            req.user.rents.push(rent._id);  
            await req.user.save();

            res.render('car/all');
        }
        catch (err) {
            console.log('Something went wrong with rentPost');
        }
        // Rent.create(obj)
        //         .then((ob) => {
        //             Car.findById(idCar)
        //                 .then((c) => {
        //                     c.isRented = true;
        //                     return c.save(); //презаписване в базата
        //                 })
        //                 .then((newCar) => {
        //                     res.render('car/all', newCar);
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                 })
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
    },
    carEdit: (req, res) => {
        const idCar = req.params.id;
        Car.findById(idCar)
            .then((car) => {
                res.render('car/edit', car);
            })
            .catch(err => {
                console.log('Something went wrong with carEdit');
                console.log(err);
            })

    },
    carPost: (req, res) => {
        const idCar = req.params.id;
        const { model, imageUrl, pricePerDay } = req.body;

        Car.findById(idCar)
            .then((car) => {
                car.model = model;
                car.imageUrl = imageUrl;
                car.pricePerDay = pricePerDay;

                return car.save();
            })
            .then(() => {
                res.redirect('/car/all');
            })
            .catch(err => {
                console.log('Something went wrong with carPost');
                console.log(err);
            });
    },
    delete: (req, res) => {
        const idCar = req.params.id;

        Car.deleteOne({_id: idCar})
                .then(() => {
                    res.render('car/all');
                })
                .catch(err => {
                    console.log(err);
                });
    },
    
    search: (req, res) => {
        const queryModelCar = req.query;
        const userBody = req.body;

        Car.find(queryModelCar)
            .then((cars) => {
                if (cars.length > 0) {
                    res.render('car/all', { cars });
                    return;
                } else {
                    for (var key in queryModelCar) {
                        var value = queryModelCar[key];
                        userBody.error = `There is no such car ${value}`;
                        res.render('car/all', userBody);
                        return;
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};