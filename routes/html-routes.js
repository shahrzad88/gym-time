// *********************************************************************************
//html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

//Dependencies
// =============================================================
var path = require("path");

//Routes
// =============================================================
module.exports = function(app) {
  //Each of the below routes just handles the HTML page that the user gets sent to.
  //index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  //signup route loads profile.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  //dashboard route loads dashboard.html
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });
};
