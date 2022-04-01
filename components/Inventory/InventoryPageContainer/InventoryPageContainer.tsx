import { InventoryComponent } from 'components/Inventory/InventoryComponent';
import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { HandleClickCard } from 'helpers/inventory/inventoryHelpers';
import * as React from 'react';
import { useGetInventoryByPageQuery } from 'store/service';

type InventoryPageContainerProps = {
  page: number;
  onClickCard: HandleClickCard
};

export const InventoryPageContainer = ({
  page,
  onClickCard,
}: InventoryPageContainerProps) => {
  const { data, isError, isLoading } = useGetInventoryByPageQuery(page);

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
