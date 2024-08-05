const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
async function authmiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const verify = jwt.verify(token, SECRET);
  if (verify) {
    req.userId = verify.userId;
    next();
  } else {
    return res.status(411).json({ msg: "User not verified" });
  }
}
module.exports = { authmiddleware };
