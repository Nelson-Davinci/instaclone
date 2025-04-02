import express, { json } from "express"; //middleware in express i.e json
import createHttpError, { isHttpError } from "http-errors";

// import routes
import userRoutes from "./routes/user.js";

const app = express();
app.use(json({ limit: "25mb" })); //parses requests to client side in json body format
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

// api
app.use("/api/auth", userRoutes);

// handle route errors
app.use((req, res, next) => {
  return next(createHttpError(404, `Route ${req.originalUrl} not found`));
});

//handle specific app errors
app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "Internal Server Error";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  //sending error to client
  res.status(statusCode).json({ error: error.message });
});

export default app;
