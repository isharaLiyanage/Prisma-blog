import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/connect";
import { getAuthSession } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const Post_per_page = 2;

  const pageSize = searchParams.get("page");
  const category = searchParams.get("cat");

  let page;
  if (pageSize === null) {
    page = 1;
  } else {
    page = parseInt(pageSize);
  }

  const skip = Post_per_page * (page - 1);

  const query = {
    take: Post_per_page,
    skip: skip,
    where: {
      ...(category && { catSlug: category }),
    },
  };
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count, status: 200 }));
  } catch {
    return new NextResponse(
      JSON.stringify({ massage: "Something Wrong...", status: 500 })
    );
  }
};

//  create  post
export const POST = async (req: NextRequest, { params }: any) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ massage: "Not Authenticated", status: 401 })
    );
  } else {
    try {
      const body = await req.json();

      const post = await prisma.post.create({
        data: { ...body, userEmail: session.user?.email },
      });

      return new NextResponse(JSON.stringify({ post, status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ massage: "Something Wrong...", status: 500 })
      );
    }
  }
};
