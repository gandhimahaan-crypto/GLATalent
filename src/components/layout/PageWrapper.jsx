import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function PageWrapper({ children, sidebar = "student" }) {
  return (
    <>
      <Navbar />
      <Sidebar type={sidebar} />
      <main className="main-content">{children}</main>
    </>
  );
}
