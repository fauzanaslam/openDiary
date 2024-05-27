"use client";

import React, { useState, useEffect } from "react";
import PostContent from "./PostContent";
import { supabase } from "@/utils/supabase";
import LikesButton from "../(button)/LikesButton";
import ShareButton from "../(button)/ShareButton";
import ScreenshootButton from "../(button)/ScreenshootButton";
import { CgComment } from "react-icons/cg";
import Link from "next/link";
import { getAuth } from "@clerk/nextjs/server";
import Skeleton from "../Skeleton";

const CardDiaries = (): React.ReactElement => {
  const [diaries, setDiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        // const userData = await getUserData();
        // if (userData.email) {
        //   setEmail(userData.email);
        // }
        const { data, error } = await supabase
          .from("diary")
          .select()
          .order("created_at", { ascending: false });

        if (error) throw error;
        setDiaries(data || []);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  if (diaries.length === 0) {
    return <p>No diaries found</p>;
  }

  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id} className="relative border-b-2 border-gray-700">
          <div id={diary.id}>
            <PostContent
              key={diary.id}
              diary_id={diary.id}
              avatar={diary.avatar}
              content={diary.content}
              email={diary.email}
              username={diary.username}
              diary_image={diary.diary_image}
              created_at={diary.created_at}
            />
          </div>
          <div className="flex items-center absolute ml-20 mb-3 -bottom-2 gap-2">
            {/* <LikesButton email={email} diary={diary} /> */}
            <ShareButton diary_id={diary.id} />
            <Link href={`/diary/${diary.id}`}>
              <CgComment />
            </Link>
            <ScreenshootButton elementId={diary.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDiaries;
