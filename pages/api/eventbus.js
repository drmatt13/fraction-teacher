import colors from "colors";
import axios from "axios";
import jwt from "jsonwebtoken";

// utils
import connectDB from "../../utils/connectDB";

export default async (req, res) => {
  const { body, cookies } = req;

  // verify validity of the token in the cookie and return the user_id
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(cookies.token, process.env.BEARER_SECRET);
    body.user_id = verifiedToken.user_id;
  } catch (error) {
    body.user_id = null;
  }

  let { service, token, user_id } = body;

  // log request
  let token_id = user_id
    ? user_id
    : cookies.token
    ? "Invalid Token"
    : "No Token";
  console.log(
    `${token_id}`.bold.yellow,
    "->".bold.red,
    `${body.service}`.bold.green
  );

  try {
    switch (service) {
      // *****************************
      // ****  NO DB REQUIRED  *******
      // *****************************

      case "get og":
        break;

      // *****************************
      // *******  USER DB  ***********
      // *****************************

      // Get user
      // Unprotected
      // returns myself or optional profile_id, returns if profile or not
      // { profile_id <optional> }
      case "get user":
        req = await axios.post(
          `${process.env.URL}/api/services/user`,
          body.data
        );
        break;

      // Login
      // Unprotected
      // returns jwt
      // { email, password }
      case "login":
        req = await axios.post(
          `${process.env.URL}/api/services/login`,
          body.data
        );
        break;

      // Register user
      // Unprotected
      // registers a user
      // { firstName, lastName, email, password }
      case "register":
        req = await axios.post(
          `${process.env.URL}/api/services/register`,
          body.data
        );
        break;

      // *****************************
      // *******  POST DB  ***********
      // *****************************

      // *****************************
      // *******  NEWS DB  ***********
      // *****************************

      // *****************************
      // *******  DEFAULT  ***********
      // *****************************

      default:
        console.log("Invalid Service".bold.red);
        req.data = {
          error: "Invalid Service",
          success: false,
        };
        break;
    }
    res.status(200).json({ ...req.data });
  } catch (error) {
    console.log(`${error}`.bold.red);
    res.status(200).json({ success: false });
  }
};
