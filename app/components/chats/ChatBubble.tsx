import clsx from "clsx";
import Avatar from "../Avatar";
import { BaseUser } from "@/app/actions/getCurrentUser";
import { format } from "date-fns";

type Props = {
  isCurrentUser?: boolean;
  content?: string | null;
  owner?: BaseUser;
  time?: Date;
};

export default function ChatBubble({
  isCurrentUser = true,
  content,
  owner,
  time,
}: Props) {
  return (
    <div className={clsx("flex gap-2", isCurrentUser && "flex-row-reverse")}>
      <Avatar width={28} height={28} user={owner} />

      <div className="flex w-9/12 flex-col gap-1 lg:w-7/12">
        {/* Info */}
        <div
          className={clsx(
            "flex gap-1 text-xs",
            isCurrentUser && "flex-row-reverse",
          )}
        >
          <div>{owner?.name}</div>
          {time && (
            <div className="text-[.6rem] opacity-50">
              {format(new Date(time), "p")}
            </div>
          )}
        </div>

        {/* Text */}
        <p
          className={clsx(
            " px-3 py-2 text-sm sm:py-3",
            isCurrentUser
              ? "self-end rounded-s-xl rounded-br-xl bg-blue-600 text-gray-50"
              : "self-start rounded-e-xl rounded-bl-xl bg-gray-200",
          )}
        >
          {content ? (
            <span className="whitespace-pre">{content}</span>
          ) : (
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              perferendis neque, deserunt possimus eaque maxime laborum ipsam
              reprehenderit, delectus magnam, sunt illo veritatis? Neque facilis
              autem, dolore a iste officiis.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
