import express from "express";

import {RestaurantModel} from "../../database/allModels";

import {ValidateRestaurantCity, ValidateRestaurantSearchString} from "../../validation/restaurant";

import {ValidateRestaurantId} from "../../validation/food";

const Router = express.Router();

/*
Router       /
Description  Get all the restaurants details
Parameters   None
Access       Public
Method       Get
*/
Router.get("/", async(req,res) => {
  try {
    await ValidateRestaurantCity(req.query);
    const {city} = req.query;
    const restaurants = await RestaurantModel.find({city});
    return res.json({restaurants});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Router       /
Description  Get a perticular restaurant details based on it's id
Parameters   _id
Access       Public
Method       Get
*/
Router.get("/:_id", async(req,res) => {
  try {
    await ValidateRestaurantId(req.params);
    const {_id} = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    return res.json({restaurant});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
Router       /search
Description  Get a perticular restaurant details based on it's id
Parameters   searchString
Access       Public
Method       Get
*/
Router.get("/search", async(req,res) => {
  try {
    await ValidateRestaurantSearchString(req.body);
    const {searchString} = req.body;
    const restaurants = await RestaurantModel.find({
      name: {$regex: searchString, $options: "i"}
    });
    return res.json({restaurants});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
