"use client";

import Image from "next/image";
import HartButton from "../components/HartButton";
import Heading from "../components/Heading";
import useCountries from "../hooks/useCountries";
import { SafeUser } from "../types";

interface ListingClientProps {
  title: string;
  imgSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingClientProps> = ({
  title,
  imgSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image fill alt={title} src={imgSrc} className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
