"use client";

import UserCard from "./UserCard";
import { useStore } from "@/app/lib/store";
import { BaseUser } from "../../utils/getCurrentUser";
import ListPanel from "../ListPanel";
import { use } from "react";

type Props = {
  usersPromise: Promise<BaseUser[]>;
};

export default function UsersList({ usersPromise }: Props) {
  const users = use(usersPromise);
  const selectedUser = useStore((state) => state.selectedUser);
  const setSelectedUser = useStore((state) => state.setSelectedUser);

  return (
    <ListPanel title="Users" isOpen={!selectedUser}>
      {users.map((user) => {
        return (
          <UserCard
            key={user.id}
            user={user}
            isSelected={user.id === selectedUser?.id}
            onClick={() => setSelectedUser(user)}
          />
        );
      })}
    </ListPanel>
  );
}
