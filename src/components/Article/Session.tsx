"use client";

import { SessionProvider } from "next-auth/react";
import Comment from "./Comment";

export default function Session({ postId }: any) {
  return (
    <SessionProvider>
      <Comment postId={postId} />
    </SessionProvider>
  );
}
