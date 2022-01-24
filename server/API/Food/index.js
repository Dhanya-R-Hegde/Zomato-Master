import express from "express";

import {FoodModel} from "../../database/allModels";

import {ValidateRestaurantId, ValidateCategory} from "../../validation/food";

const Router = express.Router();

/*
Router       /
Description  Get all the foods based on perticular restaurant
Parameters   _id
Access       Public
Method       Get
*/
Router.get("/:_id", async(req,res) => {
  try {
    await ValidateRestaurantId(req.params);
    const {_id} = req.params;
    const foods = await FoodModel.find({restaurant: _id});
    return res.json({foods});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Router       /r
Description  Get all the foods based on perticular category
Parameters   category
Access       Public
Method       Get
*/
Router.get("/r/:category", async(req,res) => {
  try {
    await ValidateCategory(req.params);
    const {category} = req.params;
    const foods = await FoodModel.find({
      category: {$regex: category, $options: "i"}
    });
    return res.json({foods});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
