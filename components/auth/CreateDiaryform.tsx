"use client";

import { createDiaryAction } from "@/actions/createDiaryAction";
import React, { useState } from "react";
import Image from "next/image";

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

const CreateDiaryform = (): React.ReactElement => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validateImageType = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return file && allowedTypes.includes(file.type);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (file && !validateImageType(file)) {
      alert("File harus berupa gambar (JPEG, PNG, GIF)!");
      event.currentTarget.value = "";
    }
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const topic = event.target.value;
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((t) => t !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.append("topics", JSON.stringify(selectedTopics));
    try {
      await createDiaryAction(formData);
    } catch (error) {
      console.error("Error creating diary:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-xl mx-auto"
    >
      <div className="flex gap-5 items-center">
        <p>pilih foto :</p>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      {selectedFile && (
        <div className="mt-2">
          <Image
            src={selectedFile}
            alt="preview"
            className="rounded-md"
            width={600}
            height={500}
          />
        </div>
      )}
      <textarea
        placeholder="isi diary kamu disini"
        className="h-52 p-4 text-lg border border-primary textarea"
        name="content"
        required
      />
      <div>
        <p className="block mb-2">Pilih Topik:</p>
        <div className="flex flex-wrap gap-2">
          {topicDiarys.map((topic, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={topic}
                checked={selectedTopics.includes(topic)}
                onChange={handleTopicChange}
                className="checkbox checkbox-primary"
              />
              <span className="text-white">{topic}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create now"}
      </button>
    </form>
  );
};

export default CreateDiaryform;
