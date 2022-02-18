import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { InventoryWithControlsContainer } from 'components/Inventory/InventoryWithControlsContainer';
import {
  fetchInventoryByPage,
  getInventoryByPageKey,
} from 'helpers/inventoryHelpers';
import useSWR from 'swr';

type InventoryPageContainerProps = {
  page: number;
};

export const InventoryPageContainer = ({
  page,
}: InventoryPageContainerProps) => {
  const { data: pokemonCollection, error } = useSWR(
    getInventoryByPageKey(page),
    fetchInventoryByPage,
  );

  if (error) return <div>Error InventoryPageContainer</div>;
  if (!pokemonCollection) return <InventoryLoader open={!pokemonCollection} />;

  return (
    <InventoryWithControlsContainer pokemonCollection={pokemonCollection} />
  );
};
