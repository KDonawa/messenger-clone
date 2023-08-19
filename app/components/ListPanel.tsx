import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
};
export default function ListPanel({ children, title, isOpen = true }: Props) {
  return (
    <div
      className={clsx(
        "fixed bottom-12 top-0 w-full sm:w-64 sm:border-r-2 md:bottom-0 md:left-40",
        !isOpen && "hidden sm:block",
      )}
    >
      <div className="flex h-full flex-col gap-5 px-2 pb-1 pt-4 sm:pb-7">
        <h1 className="text-lg font-semibold">{title}</h1>

        {/* <SearchBar /> */}

        <ul className="flex-1 space-y-1 overflow-y-auto">{children}</ul>
      </div>
    </div>
  );
}
