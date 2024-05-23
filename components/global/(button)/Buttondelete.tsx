"use client";

import deleteDiaryAction from "@/actions/deleteDiaryAction";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type ParamsProps = {
  diary_id: number | undefined;
};

const Buttondelete = ({ diary_id }: ParamsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteDiaryAction(diary_id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn btn-square btn-outline btn-warning"
        onClick={handleModal}
      >
        <AiOutlineDelete size={28} />
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3>are you sure to delete this diary?</h3>
          <div className="modal-action">
            <button className="btn" onClick={handleModal}>
              No
            </button>
            <button
              className={isLoading ? "btn loading" : "btn btn-warning"}
              onClick={handleDelete}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttondelete;
