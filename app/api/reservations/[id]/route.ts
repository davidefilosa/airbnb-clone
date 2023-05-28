import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrenUser from "@/app/actions/getCurrentUser";

interface IParams {
  id?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { id } = params;

  if (!id || typeof id !== "string") {
    return NextResponse.error();
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: id,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
