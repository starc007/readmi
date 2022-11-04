export interface EditorContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export interface EditorContextProviderProps {
  children: React.ReactNode;
}

export interface template__filesType {
  [key: string]: {
    name: string;
    md: string;
  };
}

export interface TemplateType {
  name: string;
  md: string;
}
