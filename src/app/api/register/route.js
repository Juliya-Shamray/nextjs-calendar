import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export const POST = async (req, res) => {
  const { userName, email, password } = await req.json();

  await connect();

  const user = await User.findOne({ email });

  if (user) {
    return new NextResponse(
      JSON.stringify({
        message: "Email in use",
      })
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    userName,
    password: hashPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json(
      {
        email: newUser.email,
        userName: newUser.userName,
      },
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      "Internal Server Error",
      {
        status: error.status || 500,
      },
      { status: error.status || 500 }
    );
  }
};
