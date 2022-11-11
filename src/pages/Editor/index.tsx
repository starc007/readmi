import { FC } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useEditor } from "../../context/editorContext";
import Section from "../../components/sections";
import SEO from "../../components/SEO";

const Editor: FC = () => {
  const { value, setValue } = useEditor();
  return (
    <>
      <SEO
        title="Create Your Readme"
        desc="Create, Edit and Download your readme file"
      />
      <div className="my-6">
        <div className="md:flex md:space-x-6">
          <div className="md:w-80 md:block hidden">
            <Section />
          </div>
          <div className="grid md:grid-cols-2 gap-5 md:w-full">
            <MDEditor
              value={value}
              onChange={(v) => setValue(v!)}
              preview="edit"
              extraCommands={[]}
              visibleDragbar={false}
              height={"83vh"}
            />
            <div className="border border-gray-700 rounded px-6 py-3">
              <MDEditor.Markdown
                source={value}
                style={{ height: "79vh", overflow: "auto" }}
                className="hide__scrollbar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
