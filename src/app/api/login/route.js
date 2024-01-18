import User from "@/models/User";

import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  const { email, password } = await req.json();
  const user = await User.findOne({ email });
  if (!user) {
    return new NextResponse("Email or password is wrong", { status: 401 });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return new NextResponse("Email or password is wrong", { status: 401 });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5d" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};
