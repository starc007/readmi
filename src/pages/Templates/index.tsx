import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import { useEditor } from "../../context/editorContext";
import { template__files } from "../../utils/template__files";

const Template = () => {
  const { setValue } = useEditor();
  const navigate = useNavigate();

  // edit template
  const editTemplate = (content: string) => {
    setValue(content);
    navigate("/editor");
  };

  // download the template
  const downloadTemplate = (value: string) => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 my-6 container mx-auto">
      {Object.keys(template__files).map((key) => {
        return (
          <div key={key} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-gray-300 text-lg font-semibold ">
                {template__files[key].name}
              </h1>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => editTemplate(template__files[key].md)}
                  className="bg-white/10 text-white px-3 h-8 rounded-lg text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => downloadTemplate(template__files[key].md)}
                  className="bg-blue-600 text-white px-3 h-8 rounded-lg text-xs font-semibold"
                >
                  Download
                </button>
              </div>
            </div>
            <div className="border border-gray-700 h-96 w-[340px] sm:w-full overflow-auto hide__scrollbar px-5 py-3">
              <MDEditor.Markdown source={template__files[key].md} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Template;
