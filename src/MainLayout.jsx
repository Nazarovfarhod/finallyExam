import { Outlet } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar";
import { MyFooter } from "./components/MyFooter";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dark:bg-slate-900">
      <header className="z-10 mb-3 sticky top-0">
        <MyNavbar />
      </header>
      <main className="flex grow ">
        <Outlet />
      </main>
      <footer className="sticky mt-3 bottom-0 z-10">
        <MyFooter />
      </footer>
    </div>
  );
}
