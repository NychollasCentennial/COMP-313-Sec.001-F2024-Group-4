const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt; 
    if (!token) return res.sendStatus(401); 
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.locals.user = null; 
            return next();
        }
        res.locals.user = decoded; 
        
        next();
    });
};

module.exports = authenticateToken;
