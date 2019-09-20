const express = require ('express');
const router =  express.Router();
const {check , validationResult} = require('express-validator/check');
const user = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('config');
const Jwtsecret = config.get('Jwtsecret');
//get route to api/users
router.post('/',[
    check('name', 'Namae is required').not().isEmpty(),
    check('email', 'enter valid email').isEmail(),
    check('password', 'enter password with 6 characters').isLength({min:6})

],async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name , email , password}= req.body;
    try{
       let User = await user.findOne({email:email});
       if(User){
           res.status(400).json({errors:[{msg:"user isalready exist.."}]})
       }else{
            const avatar = gravatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            });
            User = new user({
                name,email,password,avatar
            });

            const salt = await bcrypt.genSalt(10);
            User.password=await bcrypt.hash(password,salt);
            await User.save();
            const payload= {
                user: {
                    id:User.id
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
        res.status(5000).send("server error")
    }

   
});
module.exports =router;