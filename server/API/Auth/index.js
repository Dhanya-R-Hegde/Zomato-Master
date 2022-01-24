import express from "express";
import bcrypt from "bcryptjs";

//Models
import {UserModel} from "../../database/user";

//Validations
import {ValidateSignup, ValidateSignin} from "../../validation/auth";

const Router = express.Router();

/*
Route         /signup
Description   signup using email and password
Parameters    none
Access        public
Method        post
*/
Router.post("/signup", async(req,res) => {
  try {

    await ValidateSignup(req.body.credentials);

    const {email,password, fullname, phoneNumber} = req.body.credentials;

    const checkUserByEmail = await UserModel.findOne({email});
    const checkUserByPhone = await UserModel.findOne({phoneNumber});

    if(checkUserByEmail || checkUserByPhone) {
      return res.json({error: "User Already Exists!!"});
    }

    //hashing the password:
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //save to database:
    await UserModel..create({
      ...req.body.credentials,
      password: hashedPassword
    });

    //jwt token:
    const token = jwt.sign({user: {fullname, email}}, "ZomatoApp");

    return res.status(200).json({token, status: "Success"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Route         /signin
Description   signin using email and password
Parameters    none
Access        public
Method        post
*/
Router.post("/signin", async(req,res) => {
  try {
    await ValidateSignin(req.body.credentials);

    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({token, status: "Success"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});
