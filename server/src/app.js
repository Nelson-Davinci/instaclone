import express, { json } from "express"; //middleware in express i.e json
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors"; //for handling cross-origin requests
import morgan from "morgan"; //for logging requests
import { cacheMiddleware } from "./middleware/cache.js"; //for caching responses
// import routes
import postRoutes from "./routes/post.js"; //importing our post routes
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";

const app = express();
const corsOptions = {
  origin: ["http://localhost:4600", "https://instaclone-orcin.vercel.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions)); //for handling cross-origin requests i.e allows external origins to access our api or communicate with server
app.use(morgan("dev")); //logging requests to the console
app.use(json({ limit: "25mb" })); //parses requests to client side in json body format
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

//home server
app.get("/", (req, res) => {
  res.send("Welcome to Instashot API");
});

app.get("/user", cacheMiddleware("user", 600), (req, res) => {
  res.send("User data cached successfully");
});

// api
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);

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
