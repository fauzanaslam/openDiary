"use client";

import { deleteCommentAction } from "@/actions/deleteCommentAction";
import React from "react";

type ParamsProps = {
  diary_id: number;
  comment_id: number;
};

const DeleteCommentButton = ({ diary_id, comment_id }: ParamsProps) => {
  return (
    <div>
      <label
        htmlFor="my_modal_6"
        className="btn btn-square btn-warning btn-outline"
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
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">HAPUS KOMENTAR</h3>
          <p className="py-4">Apakah anda yakin ingin menghapus komentar?</p>
          <div className="modal-action">
            <button
              onClick={() => deleteCommentAction(comment_id, diary_id)}
              className="btn btn-warning"
            >
              HAPUS
            </button>
            <label htmlFor="my_modal_6" className="btn btn-outline">
              BATAL
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentButton;
