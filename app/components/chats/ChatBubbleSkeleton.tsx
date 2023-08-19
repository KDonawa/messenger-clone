import clsx from "clsx";

type Props = {
  isOwner?: boolean;
};

export default function ChatBubbleSkeleton({ isOwner = true }: Props) {
  return (
    <div
      className={clsx(
        "w-1/2 p-3",
        isOwner
          ? "self-end rounded-s-xl rounded-br-xl bg-blue-600 text-gray-50"
          : "rounded-e-xl rounded-bl-xl bg-gray-200",
      )}
    >
      <div className="flex flex-col gap-1">
        <div
          className={clsx(
            "h-1.5 rounded-full",
            isOwner ? "bg-blue-400" : "bg-gray-300",
          )}
        />
        <div
          className={clsx(
            "h-1.5 w-9/12 rounded-full",
            isOwner ? "bg-blue-400" : "bg-gray-300",
          )}
        />
        <div
          className={clsx(
            "h-1.5 w-11/12 rounded-full",
            isOwner ? "bg-blue-400" : "bg-gray-300",
          )}
        />
      </div>
    </div>
  );
}
