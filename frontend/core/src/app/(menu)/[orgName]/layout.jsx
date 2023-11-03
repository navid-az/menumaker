"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function menuLayout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}
