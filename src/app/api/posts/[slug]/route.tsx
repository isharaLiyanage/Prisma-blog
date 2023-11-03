import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../utils/connect";

export const GET = async (req: NextRequest, { params }: any) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { id: slug },
      data: { viws: { increment: 1 } },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify({ post, status: 200 }));
  } catch {
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};
