import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ImCool2 } from "react-icons/im";
import { useEditor } from "../../context/editorContext";

const Navbar = () => {
  const { value } = useEditor();
  const location = useLocation();

  const __markdownDownload = () => {
    if (value.length <= 0) {
      toast.error("Please write something to download");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const __markdownCopy = () => {
    if (value.length <= 0) {
      toast.error("Please write something to copy");
      return;
    }
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="border-b border-gray-700">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link to="/" className="md:text-4xl text-3xl font-semibold text-white">
          <ImCool2 />
        </Link>
        <div className="flex items-center space-x-2">
          <Link
            to="/templates"
            className="font-medium md:mr-4 mr-3 text-gray-100 md:text-base text-sm"
          >
            Templates
          </Link>
          {location.pathname !== "/editor" && (
            <Link
              to="/editor"
              className="flex items-center md:px-4 md:h-10 h-9 px-3 text-white bg-blue-600 rounded-lg font-semibold md:text-sm text-xs"
            >
              Create
            </Link>
          )}

          {location.pathname === "/editor" && (
            <>
              <button
                onClick={__markdownCopy}
                className="md:px-4 md:h-10 h-9 px-3 text-white bg-white/10 rounded-lg font-semibold md:text-sm text-xs"
              >
                Copy
              </button>
              <button
                onClick={__markdownDownload}
                className="md:px-4 md:h-10 h-9 px-3 text-white bg-blue-600 rounded-lg font-semibold md:text-sm text-xs"
              >
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
