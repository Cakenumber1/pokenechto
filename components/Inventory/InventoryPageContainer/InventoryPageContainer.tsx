import { InventoryComponent } from 'components/Inventory/InventoryComponent';
import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { HandleClickCard } from 'helpers/inventory/inventoryHelpers';
import { useAuth } from 'myFirebase/AuthContext';
import React from 'react';
import { usePostInventoryByPageQuery } from 'store/service';

type InventoryPageContainerProps = {
  page: number;
  onClickCard: HandleClickCard
};

export const InventoryPageContainer = ({
  page,
  onClickCard,
}: InventoryPageContainerProps) => {
  const { currentUser } = useAuth()!;
  const { data, isError, isLoading } = usePostInventoryByPageQuery({ page, uid: currentUser.uid });

  if (isError) return <div>Error InventoryPageContainer</div>;
  if (isLoading) return <InventoryLoader open />;
  if (!data) return <h1>NO DATA InventoryPageContainer</h1>;

  return (
    <InventoryComponent
      pokemonCollection={data.results}
      onClickCard={onClickCard}
    />
  );
};
