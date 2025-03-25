import express, { json } from "express";

const app = express();
app.use(json({ limit: "25mb" })); //parses requests to client side in json body format
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

export default app