const express = require ('express');
const router =  express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/profile');
const {check , validationResult} = require('express-validator/check');
const User = require('../../models/Users');
const config = require ('config');
const request = require('request');
const clientid = config.get('githubclientid');
const clientsecret = config.get('githubsecret');
//get route to api/users
router.get('/me',auth,async (req, res)=>{
    try{
        
        const profile = await Profile.findOne({user:req.user.id}).populate('user');
        console.log(JSON.stringify(profile));
        if(!profile){
        
            return res.status(400).json({msg:"threre is no profile for user"});
        }else{
            
            res.json(profile);
        }
        
    }catch(err){
        res.status(500).send("Server error"+err.message)
    }

});
router.post('/me',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()
    
]],async (req,res)=>{
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {company,website,location,bio,status,githunusername,skills,youtube,facebook,twitter,instagram,linkdin}=req.body;
        const profilefields={};
        profilefields.user=req.user.id;
        if(company){
            profilefields.company=company;
        }
        if(website){
            profilefields.website=website;
        }
        if(location){
            profilefields.location=location;
        }
        if(bio){
            profilefields.bio=bio;
        }
        if(status){
            profilefields.status=status;
        }
        if(githunusername){
            profilefields.githunusername=githunusername;
        }
        if(skills){
            
            profilefields.skills=skills.split(',').map(skill=>skill.trim());
            console.log(profilefields.skills)
        }
        profilefields.social={}

        if(youtube){
            profilefields.social.youtube=youtube;
        }
        if(facebook){
            profilefields.social.facebook=facebook;
        }
        if(twitter){
            profilefields.social.twitter=twitter;
        }
        if(instagram){
            profilefields.social.instagram=instagram;
        }
        if(linkdin){
            profilefields.social.linkdin=linkdin;
        }
        try{
            let profile = await Profile.findOne({user:req.user.id});
            if(profile){
                profile = await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profilefields},
                    {new :true}
                );
                return res.json(profile);
            }else{
                profile = new Profile(profilefields);
                await profile.save();
                res.json(profile);
            }
        }catch(err){

        }
    }catch(err){

    }

})
router.get('/',async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }catch(err){
        res.status(500).send("server error..");
    }
})
router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            res.status(400).json({msg:"profile not found "})
        }
        res.json(profile);
    }catch(err){
       
        if(err.kind=='ObjectId'){
          
            res.status(400).json({msg:"profile not found"})
        }
        res.status(500).send("server error..");
    }
})
router.delete('/',auth,async (req,res)=>{
    try{
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:"user deleted"});
    }catch(err){
        res.status(500).send("server error..");
    }
})

router.put('/experience',[auth,[
    check('title','title is required').not().isEmpty(),
    check('company','company is requreed').not().isEmpty(),
    check('from','From date is requreed').not().isEmpty(),

]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400),json({errors:errors.array()})
    }
    const {title,company,from,location,to,current,description}= req.body;
    const exp = {title,company,from,location,to,current,description};
    try{
        const profile  =await Profile.findOne({user:req.user.id});
        profile.experience.unshift(exp);
        await profile.save();
        res.json(profile)
    }catch(err){
        res.status(500).send("server error")
    }
   
})
router.delete('/experience/:exp_id',auth,async (req,res)=>{
    try{
        console.log(req.user.id);
        const profile =await  Profile.findOne({user:req.user.id});
      
        const removeexp = profile.experience.map(item=>item.id).indexOf(req.params.exp_id);  
        profile.experience.splice(removeexp,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        res.status(500).send("server error" + err.message)
    }
})


router.put('/education',[auth,[
    check('school','school is required').not().isEmpty(),
    check('degree','degree is requreed').not().isEmpty(),
    check('fieldofstudy','fieldofstudy date is requreed').not().isEmpty(),

]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400),json({errors:errors.array()})
    }
    const {school,degree,fieldofstudy,from,to,current,description}= req.body;
    const edu = {school,degree,fieldofstudy,from,to,current,description};
    try{
        const profile  =await Profile.findOne({user:req.user.id});
        profile.education.unshift(edu);
        await profile.save();
        res.json(profile)
    }catch(err){
        res.status(500).send("server error")
    }
   
})
router.delete('/education/:edu_id',auth,async (req,res)=>{
    try{
        console.log(req.user.id);
        const profile =await  Profile.findOne({user:req.user.id});
      
        const removeexp = profile.education.map(item=>item.id).indexOf(req.params.edu_id);  
        profile.education.splice(removeexp,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        res.status(500).send("server error" + err.message)
    }
})

router.get('/github/:username',(req,res)=>{
    try{
        const option ={
            uri :`http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${clientid}&client_secret=${clientsecret}`,
            method:'Get',
            headers:{'user-agent':'node.js'}
        }
        request(option,(err,response,body)=>{
            if(response.statusCode!==200){
                res.status(404).json({msg:"no github profile found.."}); 
            }
            res.json(JSON.parse(body))
        })
    }catch(err){
        res.status(500).send("server err")
    }
})
module.exports =router;