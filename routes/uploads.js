import { Router } from "express";
import multer from "multer";
import File from "../models/File.js";

const router = Router();
import { v4 as uuid4 } from "uuid";

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('upload'); //100mb


router.post("/", (req, res) => {
    if(!req.file){
        res.send("Please upload a file");       
    }
    res.send("File uploaded successfully");
    upload(req, res, (err) => {
        if(err){
            return res.status(500).send({"error": err.message   });
        }
        const file = new File({
            fileName: req.file.filename,
            uuid: uuid4(),
        });
    });
});


export default router;