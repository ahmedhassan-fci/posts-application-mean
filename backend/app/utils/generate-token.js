const jwt = require("jsonwebtoken");

module.exports = function (user, rememberMe = false) {
  let expiresIn = 8 * 60 * 60; // 8 hours
  if (rememberMe) {
    expiresIn = 365 * 30 * 24 * 60 * 60; // 1 year
  }

  return jwt.sign(
    {
      userId: user._id,
      userName: user.name,
      userAvatar: user.avatar,
    },
    process.env.JWT_KEY,
    { expiresIn: expiresIn }
  );
};
