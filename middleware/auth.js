const jwt = require('jsonwebtoken');
const config = require ('config');
const Jwtsecret = config.get('Jwtsecret');
module.exports = function(req,res,next){
    const tocken = req.header('x-auth-tocken');
    if(!tocken){
        return res.status(401).json({msg:"no tocken: Authorization denied"});
    }
    try{
        const decoded = jwt.verify(tocken, Jwtsecret);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:"tocken is not valid.."});
    }

}
