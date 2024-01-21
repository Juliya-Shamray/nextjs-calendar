import { headers } from "next/headers";
import { getUserFromToken } from "../route";
import Event from "@/models/Event";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const headersList = headers();
  const authorization = headersList.get("authorization");

  try {
    const user = await getUserFromToken(authorization.split(" ")[1]);

    const id = params.id;
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return new NextResponse("Not Found", { status: 404 });
    }
    res.json({ message: "contact deleted" });
    return NextResponse.json("event deleted", { status: 200 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
