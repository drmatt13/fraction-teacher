import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// mongoose
// import connectDB from "../../../utils/connectDB";
// import User from "../../../models/User";

export default async (req, res) => {
  const { email, password } = req.body;

  // check if email and password are valid
  // --------

  // sign user_id into a token
  const token = jwt.sign({ user_id: "123456789" }, process.env.BEARER_SECRET);

  return res.json({
    success: true,
    token,
    user: { user_id: "123456789" },
  });
};
