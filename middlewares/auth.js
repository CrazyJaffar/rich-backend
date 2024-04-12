const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Authentication check middleware
exports.authCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      // Get the JWT thats sent in headers of the request
      const token = req.headers.authorization.split(" ")[1];

      // If token exists
      if (token) {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
          // If the token provided is not valid
          if (err){
            console.log(err)
            return res
              .status(400)
              .send("Token is not valid or expired, please log in again");
          }
          req.user = user;
          next();
        });
      }
    } catch (error) {
      console.log("AUTH_CHECK_ERROR", error);
    }
  } else {
    res.status(400).send("You are unauthorized");
  }
};

// Admin check middleware
exports.adminCheck = async (req, res, next) => {
  const { _id } = req.user;

  const adminUser = await User.findOne({ _id }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      error: "Admin Resource, access denied!",
    });
  } else {
    next();
  }
};
// Super Admin check middleware
exports.superAdminCheck = async (req, res, next) => {
  const { _id } = req.user;

  const adminUser = await User.findOne({ _id }).exec();

  if (adminUser.role !== "superadmin") {
    res.status(403).json({
      error: "Super Admin Resource, access denied!",
    });
  } else {
    next();
  }
};
