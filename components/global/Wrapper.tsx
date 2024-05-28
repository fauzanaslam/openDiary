import React, { ReactElement } from "react";
import Footer from "./Footer";

type ParamsProps = {
  title?: string;
  children?: ReactElement;
};

const Wrapper = ({ title, children }: ParamsProps): ReactElement => {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 container max-w-3xl mx-auto px-2">
        <h1 className="text-center text-xl mb-8">{title}</h1>
        {children}
      </section>
    </div>
  );
};

export default Wrapper;
