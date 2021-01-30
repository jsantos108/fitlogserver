const router = require('express').Router();
const User = require('../models/user');

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email}, (err, obj) => {
        if(err){
            res.send(err);
        }else {
            if(obj){
                res.send("Someone is already using that email");
            }else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });

                newUser.save()
                    .then(() => res.send(`User Created`))
                    .catch(err => res.status(400).json(err));
            }
        }
    });
})

module.exports = router;