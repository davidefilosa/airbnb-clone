import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrenUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
