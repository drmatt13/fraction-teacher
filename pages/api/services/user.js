import colors from "colors";
import jwt from "jsonwebtoken";

// mongoose
// import connectDB from "../../../utils/connectDB";
// import User from "../../../models/User";

export default async (req, res) => {
  let { user_id, profile_id } = req.body;

  // get user
  user_id = "123456789";

  return res.json({ success: true, user: { user_id } });
};

// export default connectDB(async (req, res) => {
//   const { user_id, profile_id } = req.body;

//   try {
//     if (profile_id) {
//       const user = await User.findById(profile_id);
//       if (user) res.json({ success: true, user });
//       else res.json({ success: false });
//     } else {
//       // console.log(user_id);
//       const user = await User.findById(user_id);
//       if (user) res.json({ success: true, user });
//       else res.json({ success: false });
//     }
//   } catch (error) {
//     console.log("user not found".bold.red);
//     res.json({ success: false });
//   }
// });
