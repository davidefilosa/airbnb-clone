"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import Avatar from "../components/Avatar";
import useCountries from "../hooks/useCountries";
import { SafeUser } from "../types";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category: { icon: IconType; label: string; description: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coord = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="text-xl font-semibold flex flex-row items-center gap-2">
        <div>Hosted by {user?.name}</div>
        <Avatar currentUser={user} />
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-400">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-400">{description}</div>
      <hr />
      <Map center={coord} />
    </div>
  );
};

export default ListingInfo;
