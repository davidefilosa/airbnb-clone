"use client";

import { SafeFavorites, SafeReservation } from "../types";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
interface TripsClientProps {
  favorites: SafeReservation[];
  currentUser?: SafeFavorites | null;
}

const ReservationClient: React.FC<TripsClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="See the place you liked" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {favorites.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
