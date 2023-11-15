"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ItemsProvider } from "./menu/components/ItemsContext";

const queryClient = new QueryClient();

export default function menuLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ItemsProvider>{children}</ItemsProvider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
