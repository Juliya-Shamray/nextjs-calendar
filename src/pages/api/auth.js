import bcrypt from "bcrypt";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";

connectDB();

const fetch = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
          req.session.user = user;
          res.status(200).json({ success: true, user });
        } else {
          res
            .status(401)
            .json({ success: false, error: "Invalid username or password" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Error logging in" });
      }
      break;

    case "GET":
      if (req.session.user) {
        res.status(200).json({ success: true, user: req.session.user });
      } else {
        res
          .status(401)
          .json({ success: false, error: "User not authenticated" });
      }
      break;

    default:
      res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` });
      break;
  }
};

export default fetch;
