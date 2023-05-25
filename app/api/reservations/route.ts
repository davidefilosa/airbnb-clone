import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrenUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { totalPrice, startDate, endDate, listingId } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.reservation.create({
    data: {
      totalPrice,
      startDate,
      endDate,
      userId: currentUser.id,
      listingId,
    },
  });

  return NextResponse.json(listing);
}
