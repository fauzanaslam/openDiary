"use client";

import React from "react";

const topicDiarys = [
  "School",
  "College",
  "Math",
  "Programming",
  "Work",
  "Politics",
  "Business",
  "Holiday",
];

const Filter = ({ selectedTopics, setSelectedTopics }: any) => {
  const handleCheckboxChange = (topic: any) => {
    setSelectedTopics((prevSelectedTopics: any) => {
      if (prevSelectedTopics.includes(topic)) {
        return prevSelectedTopics.filter((t: any) => t !== topic);
      } else {
        return [...prevSelectedTopics, topic];
      }
    });
  };

  return (
    <div className="w-56 h-96 fixed left-8 top-32 rounded-md bg-gray-800 hidden md:block">
      <h4 className="my-2 text-center text-white">Topic Diary</h4>
      <div className="mx-4 my-2">
        {topicDiarys.map((topic, index) => (
          <label className="label cursor-pointer" key={index}>
            <span className="label-text text-white">{topic}</span>
            <input
              type="checkbox"
              className="checkbox"
              onChange={() => handleCheckboxChange(topic)}
              checked={selectedTopics.includes(topic)}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
