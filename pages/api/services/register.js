import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// mongoose
// import connectDB from "../../../utils/connectDB";
// import User from "../../../models/User";

export default async (req, res) => {
  const { firstName, lastName, email, password, expires } = req.body;

  const token = jwt.sign(
    { user_id: "123456789", expires },
    process.env.BEARER_SECRET
  );

  return res.json({
    success: true,
    token,
    user: { user_id: "123456789" },
  });
};
