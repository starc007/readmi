import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditor } from "../../context/editorContext";
import { sections } from "../../utils/sections";

const GenerateReadme = () => {
  const [readmeTags, setReadmeTags] = useState(sections);
  const navigate = useNavigate();
  const { setValue } = useEditor();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e.target;
    setReadmeTags(
      readmeTags.map((tag) =>
        tag.slug === value ? { ...tag, isSelected: checked } : tag
      )
    );
  };

  const generateReadme = (): void => {
    const selectedTags = readmeTags.filter((tag) => tag.isSelected);
    if (selectedTags.length === 0) {
      toast.error("Please select atleast one tag");
      return;
    }
    const readme = selectedTags.map((tag) => tag.md).join("");
    setValue(readme);
    navigate("/editor");
  };

  return (
    <div className="container mx-auto text-white my-10 flex flex-col items-center">
      <p className="text-center text-4xl font-bold">
        Generate Readme in few Seconds
      </p>
      <p className="text-xl text-gray-300 font-medium text-center mt-4">
        Select Tags to generate your readme
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {readmeTags.map((tag) => (
          <label
            key={tag.slug}
            className="readme__tag__div cursor-pointer "
            htmlFor={tag.slug}
          >
            <input
              type="checkbox"
              name="readme"
              value={tag.slug}
              id={tag.slug}
              checked={tag.isSelected}
              onChange={handleChange}
            />
            <p className="readme__tagname relative px-5 h-10 bg-white/5 border border-white/5 flex justify-center items-center rounded-lg font-medium">
              {tag.name}
            </p>
          </label>
        ))}
      </div>

      <button
        onClick={generateReadme}
        className="mt-8 w-28 h-11 bg-blue-600 text-white rounded-lg font-medium"
      >
        Generate
      </button>
    </div>
  );
};

export default GenerateReadme;
