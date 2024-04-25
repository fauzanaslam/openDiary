import { createDiaryAction } from "@/actions/createDiaryAction";
import React from "react";

const CreateDiaryform = (): React.ReactElement => {
  return (
    <form
      action={createDiaryAction}
      className="flex flex-col gap-4 max-w-xl mx-auto"
    >
      <textarea
        placeholder="isi diary kamu disini"
        className="h-52 p-4 text-lg border border-primary textarea"
        name="content"
        required
      />
      <button className="btn btn-primary" type="submit">
        Create now
      </button>
    </form>
  );
};

export default CreateDiaryform;
