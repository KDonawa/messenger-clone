import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MainPanel({ children, className = "" }: Props) {
  return (
    <div
      className={clsx(
        "fixed inset-x-0 bottom-12 top-0 sm:left-64 md:bottom-0 md:left-[416px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
