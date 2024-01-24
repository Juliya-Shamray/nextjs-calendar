import connect from "@/utils/db";
import { getUserFromToken } from "../events/route";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connect();

  const headersList = headers();
  const authorization = headersList.get("authorization");

  try {
    const user = await getUserFromToken(authorization.split(" ")[1]);

    return NextResponse.json(
      { email: user.email, name: user.userName },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
