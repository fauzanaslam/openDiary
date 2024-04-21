import Wrapper from "@/components/global/Wrapper";
import React from "react";
import CreateDiaryform from "../../components/auth/CreateDiaryform";

const page = (): React.ReactElement => {
  return (
    <Wrapper title="DASHBOARD">
      <CreateDiaryform />
    </Wrapper>
  );
};

export default page;
