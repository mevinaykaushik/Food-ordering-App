const express = require('express');
const User = require('../models/User');
const router =express.Router();
const { check, validationResult } = require('express-validator')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret= "helloworldmynameisvinay";



const validateUser = [
    check('name').isLength({ min: 2 }).withMessage('Name must be at least 6 characters'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ];

  // Sign up functaility

router.post('/createuser',validateUser,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let securePass= await bcrypt.hash(req.body.password,salt);

    try {
       await User.create({
        
           name:req.body.name,
            password:securePass,
            email:req.body.email,
            location:req.body.location,
          }
            


        )
        res.json({success:true});
        
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }

})
router.post('/createuser',validateUser,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
       await User.create({
        
           name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            location:req.body.location,
          }
            


        )
        res.json({success:true});
        
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }

})

//Login functanility 
const validateLogin = [
 
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

router.post('/loginuser',validateLogin,async (req,res)=>{

 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  let email=req.body.email;

  try {
     let userdata= await User.findOne({email});
          
     if(!userdata){
      return  res.status(400).json({ errors: "try using a valid credential" });
     }

     const passCompare= await bcrypt.compare(req.body.password,userdata.password)
     if(!passCompare){
      return  res.status(400).json({ errors: "try using a valid password" });
     }

const data={
  user:{
    id:userdata._id,
  }
}
     const authToken =jwt.sign(data,jwtsecret) 
      res.json({success:true,authToken:authToken});
      
  } catch (error) {
      console.log(error);
      res.json({success:false})
  }

})



module.exports=router;