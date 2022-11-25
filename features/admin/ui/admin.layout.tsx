import useSession from "@features/session/useSession.hook";
import Spinner from "@features/ui/spinner.component";
import useUILoaders from "@features/ui/useUILoaders.hook";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import Header from "./header.component";
import Navigation from "./navigation.component";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { isLoading } = useUILoaders();
  const { isLoggedIn } = useSession();
  const router = useRouter();
  if (router.isReady && !isLoggedIn) {
    router.replace("/admin");
  }
  return (
    <div className="h-screen bg-light-200 font-serif">
      {/* <span className="hidden text-warning "></span> */}
      <Header />
      <div className="flex px-8 py-4 gap-4 w-screen">
        <Navigation />
        <main className="bg-white rounded-lg p-4 font-sans w-full">
          {isLoading ? <Spinner isLoading /> : children}
        </main>
      </div>
    </div>
  );
}
