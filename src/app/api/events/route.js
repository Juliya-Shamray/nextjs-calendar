import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { headers } from "next/headers";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import connect from "@/utils/db";

export const getUserFromToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    return user;
  } catch (error) {
    return new NextResponse("Not authorized", { status: 401 });
  }
};

export const GET = async (req) => {
  await connect();
  const headersList = headers();
  const authorization = headersList.get("authorization");

  try {
    const user = await getUserFromToken(authorization.split(" ")[1]);
    const result = await Event.find({ owner: user._id });

    return NextResponse.json(
      {
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error.message, { status: 401 });
  }
};

export const POST = async (req) => {
  const { start, duration, title } = await req.json();
  await connect();
  const headersList = headers();
  const authorization = headersList.get("authorization");

  try {
    const user = await getUserFromToken(authorization.split(" ")[1]);

    const event = await Event.create({
      start,
      duration,
      title,
      owner: user._id,
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
