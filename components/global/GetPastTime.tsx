"use client";

import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

const GetPastTime = ({ past_time }: any) => {
  const pastTime = formatDistanceToNow(past_time, {
    addSuffix: true,
    locale: id,
  });
  return (
    <div>
      <p className="text-sm">. {pastTime}</p>
    </div>
  );
};

export default GetPastTime;
