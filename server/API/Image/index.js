import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import {ImageModel} from "../../database/allModels";
import {s3Upload} from "../../Utils/AWS/s3";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
Router       /
Description  Uploading the given image to AWS S3 account and then saving the file to mongodb
Parameters   None
Access       Public
Method       Post
*/
Router.post("/", upload.single("file"), async(req,res) => {
  try {
    const file = req.file;
    const bucketOptions = {
      Bucket: "achchuaarya",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    const uploadImage = await s3Upload(bucketOptions);
    return res.status(200).json({uploadImage});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
