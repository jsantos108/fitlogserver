const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied');

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            req.user = decoded;
        });
        
        next();
    }catch(err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;