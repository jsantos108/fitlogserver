const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');

router.route('/register').post((req, res) => {
    //Validate the input data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check if user already exists
    
    
    //Create a new user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save()
        .then(() => res.send(newUser))
        .catch(err => res.status(400).json(err))
})

module.exports = router;