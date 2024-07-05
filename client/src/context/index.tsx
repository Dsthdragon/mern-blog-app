import { ReactNode, createContext, useState } from "react";
import { IFormData } from "../interfaces/form";

export interface IGlobalContent {
  formData: IFormData;
  setFormData: (e: IFormData) => void;
  blogList: IFormData[];
  setBlogList: (e: IFormData[]) => void;
  pending: boolean;
  setPending: (e: boolean) => void;
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
}

export const GlobalContext = createContext<IGlobalContent>({
  formData: {
    title: "",
    description: ""
  },
  setFormData: () => {},
  blogList: [],
  setBlogList: () => {},
  pending: false,
  setPending: () => {},
  isEdit: false,
  setIsEdit: () => {}
});

interface Props {
  children: ReactNode;
}

export default function GlobalState({ children }: Props) {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    description: ""
  });

  const [blogList, setBlogList] = useState<IFormData[]>([]);
  const [pending, setPending] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        pending,
        setPending,
        blogList,
        setBlogList,
        isEdit,
        setIsEdit
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
