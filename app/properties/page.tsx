import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrenUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="There are no propeties found"
          subtitle="Looks like you have any propeties listed yet"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
