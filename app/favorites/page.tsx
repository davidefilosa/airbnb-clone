import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrenUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import getFavorites from "../actions/getFavorites";

const FavoritessPage = async () => {
  const currentUser = await getCurrenUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const favorites = await getFavorites();
  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="There are no favorites found"
          subtitle="Looks like you have favorite any place yet"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritesClient favorites={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritessPage;
