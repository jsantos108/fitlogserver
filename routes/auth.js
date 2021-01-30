const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.send(err);
        }else {
            if(user){
                res.send("Someone is already using that email");
            }else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword) {
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPassword
                    });
    
                    newUser.save()
                        .then(() => res.send('User Created'))
                        .catch(err => res.status(400).json(err));
                });

                
            }
        }
    });
})

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){
            res.send(err);
        }else {
            if(!user){
                res.send("Email is incorrect");
            }else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if(result) {
                        res.send('Logged In');
                    }else {
                        res.send('Password is incorrect')
                    }
                });
            }
        }
    });
});

module.exports = router;