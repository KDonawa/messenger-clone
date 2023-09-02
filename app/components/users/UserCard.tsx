import Avatar from "@/app/components/Avatar";
import clsx from "clsx";
import { BaseUser } from "../../actions/getCurrentUser";

type Props = {
  user: BaseUser;
  isSelected?: boolean;
  onClick: () => void;
};

export default function UserCard({ user, isSelected = false, onClick }: Props) {
  return (
    <div
      className={clsx(
        "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2",
        isSelected ? "bg-slate-900 text-white" : "hover:bg-gray-100",
      )}
      onClick={onClick}
    >
      <Avatar user={user} />

      <p className="">{user.name}</p>
    </div>
  );
}
