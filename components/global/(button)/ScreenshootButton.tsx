"use client";

import React from "react";
import html2canvas from "html2canvas-pro";
import { TbCapture } from "react-icons/tb";

type ParamsProps = {
  elementId: string;
};

const ScreenshotButton = ({ elementId }: ParamsProps) => {
  const handleScreenshot = () => {
    const element = document.getElementById(elementId);
    const topicsElement = element?.querySelector("#topics");
    if (!element) {
      console.error(`Element with id ${elementId} not found.`);
      return;
    }

    if (topicsElement) {
      (topicsElement as HTMLElement).style.display = "none";
    }

    html2canvas(element)
      .then((canvas) => {
        document.body.appendChild(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.setAttribute("download", "my-image.png");
        a.setAttribute("href", image);
        a.click();
        canvas.remove();
      })
      .finally(() => {
        // Tampilkan kembali topics
        if (topicsElement) {
          (topicsElement as HTMLElement).style.display = "";
        }
      });
  };

  return (
    <div className="flex items-center">
      <button onClick={handleScreenshot}>
        <TbCapture />
      </button>
    </div>
  );
};

export default ScreenshotButton;
