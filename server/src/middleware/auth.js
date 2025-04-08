import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = async (req, res, next) => {
  const { authorization: token } = req.headers; //get the token from the header
  if (!token) {
    return next(createHttpError(403, "You are unauthenticated"));
  }
  // if token does not begin with the word - Bearer
  if (!token.startsWith("Bearer")) {
    return next(createHttpError(401, "Token format is invalid"));
  }
  // split the token to get the actual token i.e the bearer word from the token
  const extractedToken = token.split(" ")[1];
  try {
    //verify the token using the secret key
    const decodedToken = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);
    // attach/assign the decoded token to the request object i.e req.user
    req.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

// authorized roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, "User unauthorized for this request"));
    }
    //use next handler to call whats supposed to happen after running the checks
    next();
  };
};
