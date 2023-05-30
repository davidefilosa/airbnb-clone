"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
    console.log(isOpen);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 p-4 rounded full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transiction"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar currentUser={currentUser} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/");
                  }}
                  label="Home"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                  }}
                  label="My properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                  }}
                  label="Sign Up"
                />
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                  }}
                  label="Login In"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
