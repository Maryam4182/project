import express from "express";
import cors from "cors";
import { controllers } from "./controllers";
import bodyParser from "body-parser";
import { errorMiddleware } from "./middleware";
import fileUpload from 'express-fileupload';

class App {

    app;

    constructor() {

        this.app = express()
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(express.static("uploads"));

        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.use(fileUpload({
            limits: {fileSize: 50 * 1024 *1024},
        }));

        this.app.get("/", function (req, res) {

            res.sendFile("/index.html");

        });

        // Health check endpoint for Railway
        this.app.get("/health", function (req, res) {
            res.status(200).json({ 
                status: "OK", 
                message: "Server is running",
                timestamp: new Date().toISOString()
            });
        });

        
        this.initializeControllers()
        this.initializeMiddlewares()
    }

    initializeControllers() {

        var controllersList = controllers()

        controllers().map(controller => {

            this.app.use("/", controller.router);
        });

    }

    initializeMiddlewares() {

         this.app.use(errorMiddleware())

    }

}


export default App;


