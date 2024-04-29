"use client";

import { createDiaryAction } from "@/actions/createDiaryAction";
import React from "react";

const CreateDiaryform = (): React.ReactElement => {
  const validateImageType = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return file && allowedTypes.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file && !validateImageType(file)) {
      alert("File harus berupa gambar (JPEG, PNG, GIF)!");
      event.currentTarget.value = "";
    }
  };

  return (
    <form
      action={createDiaryAction}
      className="flex flex-col gap-4 max-w-xl mx-auto"
    >
      <div className="flex gap-5 items-center">
        <p>pilih foto :</p>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <textarea
        placeholder="isi diary kamu disini"
        className="h-52 p-4 text-lg border border-primary textarea"
        name="content"
        required
        maxLength={50}
      />
      <button className="btn btn-primary" type="submit">
        Create now
      </button>
    </form>
  );
};

export default CreateDiaryform;
