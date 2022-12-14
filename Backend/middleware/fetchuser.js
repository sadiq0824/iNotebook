var jwt = require("jsonwebtoken");

const fetchusers = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "access denied" });
  }
  try {
    const data = jwt.verify(token, "JWT_Secret");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "access denied" });
  }
};

module.exports = fetchusers;
