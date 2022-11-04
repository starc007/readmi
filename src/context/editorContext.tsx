import { createContext, useContext, FC, ReactNode, useState } from "react";
import { EditorContextType, EditorContextProviderProps } from "../utils/types";

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditor = () => useContext(EditorContext) as EditorContextType;

export const EditorProvider: FC<EditorContextProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState<string>("# Hi Legends 👋");

  return (
    <EditorContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
