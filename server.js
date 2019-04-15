const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "test123";
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    done(null, jwt_payload);
}));
app.listen(3002);

app.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("ok");
});

app.get("/login", (req, res) => {
    res.send(jwt.sign({username: "test", password: "test"}, "test123"));
})