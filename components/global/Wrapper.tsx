import React, { ReactElement } from "react";
import Footer from "./Footer";

type ParamsProps = {
  title?: string;
  children?: ReactElement;
};

const Wrapper = ({ title, children }: ParamsProps): ReactElement => {
  return (
    <div>
      <section className="container max-w-3xl mx-auto px-2 min-h-screen">
        <h1 className="text-center text-xl mb-8">{title}</h1>
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Wrapper;
