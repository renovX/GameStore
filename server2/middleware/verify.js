import jwt from "jsonwebtoken";
import express from "express";

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header["Authorization"];
  req.token = bearerHeader;
};

export default function verify(req, res, next) {
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
  console.log('token:' + token)

  if (!token) {
    console.log('UnAuthorized')
    return res.status(401).send('UnAuthorized')
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log("Invalid Token");
      res.sendStatus(403);
    } else {
      console.log('Correct Token')
      next();
    }
  });
}
