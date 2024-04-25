"use client";

import { deleteCommentAction } from "@/actions/deleteCommentAction";
import React from "react";
import { useAuth } from "@clerk/nextjs";

type ParamsProps = {
  diary_id: number;
  comment_id: number;
};

const DeleteCommentButton = ({ diary_id, comment_id }: ParamsProps) => {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
    <button
      onClick={() => deleteCommentAction(comment_id, diary_id)}
      className="btn btn-square btn-outline btn-warning"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  ) : null;
};

export default DeleteCommentButton;
