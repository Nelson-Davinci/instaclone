import express from "express";
import {
  createPost,
  getAllPosts,
  handleLikePost,
  seeWhoLikedPost,
  handleSavePost,
  getAPost,
  deletePost,
} from "../controller/post.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";
import { cacheMiddleware, clearCache } from "../middleware/cache.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  authorizeRoles("user", "admin"),
  createPost
);

router.get(
  "/get",
  verifyToken,
  authorizeRoles("user", "admin"),
  cacheMiddleware("posts", 600),
  getAllPosts
);

router.patch(
  "/like/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  (req, res, next) => {
    clearCache("posts"); //clear previous posts
    next();
  },
  handleLikePost
);

router.patch(
  "/save/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  (req, res, next) => {
    clearCache("posts"); //clear previous posts
    next();
  },
  handleSavePost
);

router.get(
  "/see-who-liked/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  cacheMiddleware("seeLikes", 600),
  seeWhoLikedPost
);

router.get(
  "/get/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  cacheMiddleware("post", 600),
  getAPost
);

router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRoles("user", "admin"),
  (req, res, next) => { 
    clearCache("posts"); //populate user with new data
    next();
  },
  deletePost
);


export default router;
