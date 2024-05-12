import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // it used for connecting backend with frontend
//a mechanism by which a front-end client can make requests for resources to an external back-end server.
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
const app = express(); //creating instance of express
dotenv.config({ path: "./config/config.env" }); //connecting with config.env file

app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //here array is used because you can connect mutlple frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); //connection with frontend
//app.use() is a method used to mount middleware functions in the application's request processing pipeline. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. They can perform tasks such as parsing request bodies, logging, authentication, authorization, error handling, etc.
app.use(express.json()); //This line tells Express.js to use the built-in middleware to parse JSON-formatted request bodies.
app.use(express.urlencoded({ extended: true })); //This line sets up middleware to parse URL-encoded request bodies.
/*Here are some key points about middleware functions:

Access to Request and Response Objects: Middleware functions have access to the request and response objects, which allows them to inspect and manipulate incoming requests and outgoing responses.

Next Function: Middleware functions can optionally call the next() function to pass control to the next middleware function in the stack. If next() is not called within a middleware function, the request-response cycle will be terminated, and no further middleware functions or route handlers will be called.

Order of Execution: Middleware functions are executed in the order they are added to the application, using the app.use() method. This allows you to control the flow of incoming requests and perform tasks such as authentication, logging, error handling, etc., before reaching the route handlers.

Error Handling: Middleware functions can also be used for error handling. By defining a middleware function with four parameters (err, req, res, next), Express.js identifies it as an error-handling middleware. If an error occurs in any middleware or route handler, Express.js will pass the error to the next error-handling middleware in the stack.

Modularity: Middleware functions are a powerful mechanism for organizing code in a modular and reusable way. They can be defined separately and reused across different routes or <applications></applications>*/
app.use(cookieParser()); //used for parsing the cookie set by client side or server
//used for authentication,session management,tracking user history

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
