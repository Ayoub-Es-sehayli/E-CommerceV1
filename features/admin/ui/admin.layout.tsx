import useUILoaders from "@features/ui/useUILoaders.hook";
import { PropsWithChildren } from "react";
import Header from "./header.component";
import Navigation from "./navigation.component";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { isLoading } = useUILoaders();
  return (
    <div className="h-screen bg-light-200 font-serif">
      <Header />
      <div className="flex px-8 py-4 gap-4 w-screen">
        <Navigation />
        <main className="bg-white rounded-lg p-4 font-sans w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
