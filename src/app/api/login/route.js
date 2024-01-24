import User from "@/models/User";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (req, res) => {
  await connect();
  const SECRET_KEY = process.env.SECRET_KEY;
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

  return NextResponse.json({
    user: {
      email: user.email,
      name: user.userName,
    },
    token,
  });
};
