import Wrapper from "@/components/global/Wrapper";
import { supabase } from "@/utils/supabase";
import React from "react";
import Image from "next/image";

export const revalidate = 0;

type ParamsProps = {
  params: {
    email: string;
  };
};

const page = async ({ params }: ParamsProps) => {
  const decodedEmail = decodeURIComponent(params.email);

  const { data, error } = await supabase
    .from("user")
    .select()
    .order("created_at", { ascending: false })
    .eq("email", decodedEmail)
    .single();

  return (
    <Wrapper>
      <div>
        <div className="flex gap-5 mb-5">
          <div>
            <Image src={data.avatar} alt="avatar" width={200} height={200} />
          </div>
          <div className="flex-1">
            <p>{data.email}</p>
            <div className="flex">
              <div className="flex-1">
                <div className="flex justify-center items-center h-44 bg">
                  <div className="gap-2">
                    <p className="text-2xl text-center">
                      {data.content.length}
                    </p>
                    <p className="text-2xl">Diary</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-center items-center h-44 bg">
                  <div className="gap-2">
                    {/* <p className="text-2xl text-center">0</p> */}
                    <p className="text-2xl">Followers</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-center items-center h-44 bg">
                  <div className="gap-2">
                    {/* <p className="text-2xl text-center">0</p> */}
                    <p className="text-2xl">Following</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </Wrapper>
  );
};

export default page;
