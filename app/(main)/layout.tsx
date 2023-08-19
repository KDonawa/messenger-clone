import Navbar from "@/app/components/nav/Navbar";
import MobileNavbar from "@/app/components/nav/MobileNavbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      {/* Nav Section */}
      <Navbar className="fixed inset-y-0 left-0 hidden w-40 flex-col border-r-2 py-6 md:flex" />
      <MobileNavbar className="fixed inset-x-0 bottom-0 h-12 border-t-[1px] md:hidden" />

      {/* Main Section */}
      <main>{children}</main>
    </div>
  );
}
