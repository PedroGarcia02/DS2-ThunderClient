const jwt = require('jsonwebtoken')

const isAuth  = (req, res, next) => {
    
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(407).json({message:  "Sem Permissão"}); 
    }

    try {
        const tokenValidado = jwt.verify(token, "SECRET%$#");
        req.user = tokenValidado;
    } catch (error) {
        return res.status(407).json({ message: "Sem Permissão" });
    }
    
    next();
}

module.exports = { isAuth };