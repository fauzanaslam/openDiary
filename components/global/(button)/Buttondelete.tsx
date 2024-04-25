"use client";

import deleteDiaryAction from "@/actions/deleteDiaryAction";
import React from "react";

type ParamsProps = {
  diary_id: number | undefined;
};

const Buttondelete = ({ diary_id }: ParamsProps) => {
  return (
    <div>
      <button
        onClick={() => deleteDiaryAction(diary_id)}
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
    </div>
  );
};

export default Buttondelete;
