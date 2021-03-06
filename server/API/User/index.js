import express from "express";

import {UserModel} from "../../database/allModels";

const Router = express.Router();

/*
Router       /
Description  Get an user data
Parameters   _id
Access       Public
Method       Get
*/
Router.get("/:_id", async(req,res) => {
  try {
    const {_id} = req.params;
    const getUser = await UserModel.findById(_id);
    return res.json({user: getUser});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Router       /update
Description  Updata an user data
Parameters   userId
Access       Public
Method       Put
*/
Router.put("/update/:_userId", async(req,res) => {
  try {
    const {userId} =req.params;
    const {userData} =req.body;
    const updateUserData = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: userData
      },
      {new: true}
    );
    return res.json({user: updateUserData});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
