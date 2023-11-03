import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { getAuthSession } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest, { params }: any) => {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  try {
    const comment = await prisma.comment.findMany({
      where: { ...(postId && { postSlig: postId }) },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify({ comment, status: 200 }));
  } catch {
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};

//  create  comment
export const POST = async (req: NextRequest, { params }: any) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ massage: "Not Authenticated", status: 401 })
    );
  } else {
    try {
      const body = await req.json();

      const comment = await prisma.comment.create({
        data: { ...body, userEmail: session.user?.email },
      });

      return new NextResponse(JSON.stringify({ comment, status: 200 }));
    } catch {
      return new NextResponse(
        JSON.stringify({ massage: "Something Wrong...", status: 500 })
      );
    }
  }
};
