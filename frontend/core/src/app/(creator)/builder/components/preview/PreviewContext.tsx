"use client";

import { createContext, useContext, SetStateAction } from "react";

export type ActivePreviewPage = "home" | "menu" | "cart";

interface PreviewContextType {
  setActivePage: React.Dispatch<SetStateAction<ActivePreviewPage>>;
  container: HTMLElement | null;
  isPreview: true;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

interface PreviewProviderProps {
  children: React.ReactNode;
  setActivePage: React.Dispatch<SetStateAction<ActivePreviewPage>>;
  container: HTMLElement | null;
}

export function PreviewProvider({
  children,
  setActivePage,
  container,
}: PreviewProviderProps) {
  return (
    <PreviewContext.Provider
      value={{ container, setActivePage, isPreview: true }}
    >
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  const context = useContext(PreviewContext);
  if (!context) {
    return {
      isPreview: false as const,
      setActivePage: (() => {}) as React.Dispatch<
        SetStateAction<ActivePreviewPage>
      >,
      container: null as HTMLElement | null,
    };
  }
  return context;
}

export function usePreviewContainer() {
  return useContext(PreviewContext)?.container ?? null;
}
