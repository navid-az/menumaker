// PreviewContext.tsx
import { createContext, useContext, ReactNode } from "react";

interface PreviewContextType {
  container: HTMLElement | null;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export function PreviewProvider({
  children,
  container,
}: {
  children: ReactNode;
  container: HTMLElement | null;
}) {
  return (
    <PreviewContext.Provider value={{ container }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreviewContainer() {
  return useContext(PreviewContext)?.container; // Return undefined if context is absent
}
