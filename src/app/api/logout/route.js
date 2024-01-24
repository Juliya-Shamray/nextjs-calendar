import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import connect from "@/utils/db";

export const POST = async (req, res) => {
  await connect();
  const SECRET_KEY = process.env.SECRET_KEY;
  const headersList = headers();
  const authorization = headersList.get("authorization");

  if (!authorization) {
    return new NextResponse("Authorization header is missing", { status: 401 });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return new NextResponse("Invalid authorization header format", {
      status: 401,
    });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    await User.findByIdAndUpdate(user._id, { token: "" });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Not authorized", { status: 401 });
  }
};
