import clsx from "clsx";
import Avatar from "../Avatar";

type Props = {
  isCurrentUser?: boolean;
  owner?: string;
  time?: string;
  content?: string;
};

export default function ChatBubble({ isCurrentUser = true }: Props) {
  return (
    <div className={clsx("flex gap-2", isCurrentUser && "flex-row-reverse")}>
      <Avatar width={28} height={28} />

      <div className="flex flex-col gap-1">
        {/* Info */}
        <div
          className={clsx(
            "flex gap-1 text-xs",
            isCurrentUser && "flex-row-reverse",
          )}
        >
          <div>User</div>
          <div className="text-[.6rem] opacity-50">9:17 AM</div>
        </div>

        {/* Text */}
        <div
          className={clsx(
            "w-7/12 px-3 py-2 text-xs sm:py-3",
            isCurrentUser
              ? "self-end rounded-s-xl rounded-br-xl bg-blue-600 text-gray-50"
              : "rounded-e-xl rounded-bl-xl bg-gray-200",
          )}
        >
          <p className="">
            Hi. How have you been? I need this text to be longer so I can test
            wrapping
          </p>
        </div>
      </div>
    </div>
  );
}
