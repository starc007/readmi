import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { EditorProvider } from "./context/editorContext";
import Editor from "./pages/Editor";
import LandingPage from "./pages/LandingPage";
import Layout from "./pages/Layout";
import Template from "./pages/Templates";
import GenerateReadme from "./pages/GenerateReadme";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <EditorProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/templates" element={<Template />} />
            <Route path="/generate-readme" element={<GenerateReadme />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </EditorProvider>
    </Router>
  );
};

export default App;
