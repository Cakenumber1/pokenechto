import useSWR from 'swr';
import {
  fetchInventoryByPage,
  getInventoryByPageKey,
} from '../../../helpers/inventoryHelpers';
import { InventoryWithControlsContainer } from '../InventoryWithControlsContainer';
import { InventoryLoader } from '../InventoryLoader';

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
