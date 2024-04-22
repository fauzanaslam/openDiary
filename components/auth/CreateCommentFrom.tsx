"use client";

import { createCommentAction } from "@/actions/createCommentAction";
import React, { RefObject, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

type ParamsProps = {
  diary_id: number;
};

const CreateCommentFrom = ({ diary_id }: ParamsProps) => {
  const formRef: RefObject<HTMLFormElement> = useRef<HTMLFormElement>(null);

  const { isSignedIn } = useAuth();

  if (!isSignedIn)
    return (
      <div className="flex justify-center">
        <Link
          href="/sign-in"
          className="text-center mb-10 py-2 px-5 bg-primary max-w-sm text-white rounded inline-block hover:bg-secondary"
        >
          login untuk berkomentar
        </Link>
      </div>
    );

  const resetForm = (): void => {
    setTimeout(() => {
      formRef.current?.reset();
    }, 1000);
  };

  return (
    <form
      action={createCommentAction}
      className="flex flex-col gap-4 mx-auto w-full"
      onSubmit={resetForm}
    >
      <textarea
        placeholder="tuliskan komentar disini>>"
        className="h-52 p-4 text-lg border border-primary textarea"
        name="content"
      />
      <input type="hidden" value={diary_id} name="diary_id" />
      <button className="btn btn-primary max-w-sm mx-auto w-full" type="submit">
        Comment now
      </button>
    </form>
  );
};

export default CreateCommentFrom;
