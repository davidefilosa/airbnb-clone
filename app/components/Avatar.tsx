"use client";

import Image from "next/image";
import { SafeUser } from "@/app/types";

interface AvatarPromps {
  currentUser?: SafeUser | null;
}

const Avatar: React.FC<AvatarPromps> = ({ currentUser }) => {
  return (
    <Image
      alt="avatar"
      className="rounded-full"
      width="30"
      height="30"
      src={currentUser?.image || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
