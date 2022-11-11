import React from "react";
import { useEditor } from "../../context/editorContext";
import { sections } from "../../utils/sections";

const Section = () => {
  const { setValue } = useEditor();

  const __addSection = (section: string) => {
    setValue((prev: string) => {
      const e = document.querySelector(".w-md-editor-text-input ");
      const target = e as HTMLTextAreaElement;
      const textAfter = target.value.substring(
        0,
        target.selectionStart || prev.length
      );
      const textBefore = prev.substring(textAfter.length, prev.length);
      return textAfter + section + textBefore;
    });
  };

  return (
    <div className="text-white py-4 div__style hide__scrollbar">
      <p className="text-sm font-semibold text-center">
        Click below section to add
      </p>
      <div className="flex flex-col items-center space-y-3 mt-4">
        <button
          onClick={() => {
            setValue("");
          }}
          className="w-56 h-11 text-white bg-blue-600 rounded-lg font-medium"
        >
          Reset
        </button>
        {sections.map((section) => (
          <button
            key={section.slug}
            onClick={() => __addSection(section.md)}
            className="w-56 h-11 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            {section.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Section;
