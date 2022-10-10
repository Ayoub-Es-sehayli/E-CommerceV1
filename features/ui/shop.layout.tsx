import { PropsWithChildren } from "react";
import Footer from "./footer.component";
import NavBar from "./navbar/navbar.component";
import { SideBar } from "./sidebar.component";

export default function ShopLayout({ children }: PropsWithChildren) {
  return (
    <div className="daisy-drawer">
      <input id="nav-drawer" type="checkbox" className="daisy-drawer-toggle" />
      <div className="daisy-drawer-content h-screen flex flex-col justify-between">
        <header>
          <NavBar />
        </header>
        <main className="container mx-auto mb-4 lg:my-4 px-4">{children}</main>
        <Footer />
      </div>
      <SideBar />
    </div>
  );
}