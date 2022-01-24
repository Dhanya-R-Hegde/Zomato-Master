import express from "express";

import {ReviewModel} from "../../database/allModels";

const Router = express.Router();

/*
Router       /new
Description  Add new review
Parameters   None
Access       Public
Method       Post
*/
Router.post("/new", async(req,res) => {
  try {
    const {reviewData} = req.body;
    await ReviewModel.create(reviewData);
    return res.json({review: "Successfully created review"});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Router       /delete
Description  Delete a review
Parameters   _id
Access       Public
Method       Delete
*/
Router.delete("/delete/:_id", async(req,res) => {
  try {
    const {_id} = req.params;
    await ReviewModel.findByIdAndDelete(_id);
    return res.json({review: "Successfully deleted review"});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
