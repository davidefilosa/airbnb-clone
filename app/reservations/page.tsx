import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrenUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationClient from "./ReservetionClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="There are no reservation found"
          subtitle="Looks like you have any reservations yet"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
