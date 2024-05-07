"use client";

import React from "react";
import { WhatsappShareButton } from "next-share";
import { FaShare } from "react-icons/fa";

type ParamsProps = {
  diary_id: string;
};

const ShareButton = ({ diary_id }: ParamsProps) => {
  return (
    <div className="flex items-center">
      <WhatsappShareButton
        url={`https://open-diary-eta.vercel.app/diary/${diary_id}`}
      >
        <FaShare />
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButton;
