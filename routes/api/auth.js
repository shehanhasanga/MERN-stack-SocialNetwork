const express = require ('express');
const router =  express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/Users')
const jwt = require('jsonwebtoken');
const {check , validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const config = require ('config');
const Jwtsecret = config.get('Jwtsecret');
//get route to api/users
router.get('/',auth,async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        res.status(500).send('Server error');
    }

});


//get route to api/users
router.post('/',[
    check('email', 'enter valid email').isEmail(),
    check('password', 'enter password with 6 characters').exists()

],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const { email , password}= req.body;
    try{
       let user = await User.findOne({email:email});
       if(!user){
           res.status(400).json({errors:[{msg:"invalid credentials ...."}]})
       }else{
            const match = await bcrypt.compare(password,user.password);
            if(!match){
                res.status(400).json({errors:[{msg:"invalid credentials ...."}]});
            }
            const payload= {
                user: {
                    id:user.id
                }
            }
            jwt.sign(payload,Jwtsecret,{
                expiresIn:360000
            },
            (err,tocken)=>{
                if(!err){
                    res.json({tocken});
                }
            });
          
       }
    }catch(err){
        res.status(500).send("server error" +err.message);
    }

   
});
module.exports =router;