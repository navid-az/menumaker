// PreviewContext.tsx
import { createContext, useContext, ReactNode } from "react";

export type ActivePreviewPage = "home" | "menu" | "order";

interface PreviewContextType {
  setActivePage: React.Dispatch<React.SetStateAction<ActivePreviewPage>>;
  container: HTMLElement | null;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({
  children,
  setActivePage,
  container,
}: {
  children: ReactNode;
  setActivePage: React.Dispatch<React.SetStateAction<ActivePreviewPage>>;
  container: HTMLElement | null;
}) {
  return (
    <PreviewContext.Provider value={{ container, setActivePage }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context)
    throw new Error("usePreview must be used within a PreviewProvider");
  return context;
}

export function usePreviewContainer() {
  return useContext(PreviewContext)?.container;
}
