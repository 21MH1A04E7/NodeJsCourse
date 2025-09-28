const express = require("express");
const router = express.Router();

// Define routes
router.get("/product", (req, res) => {
  console.log(req.headers.cookie);
//   console.log(req.cookies);
    console.log(req.signedCookies)
  if (req.signedCookies.token && req.signedCookies.token == "cookie-secret") {
    res.status(200).json({
      message: "product getting",
    });
  } else {
    res.status(403).json({
      message: "you are not logged in",
    });
  }
});

module.exports = router;
