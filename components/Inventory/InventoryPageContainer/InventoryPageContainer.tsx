import useSWR from "swr";

import { LinearProgress } from "@mui/material";
import { InventoryComponent } from "../InventoryComponent";
import {
  fetchInventoryByPage,
  getInventoryByPageKey,
} from "../../../helpers/inventoryHelpers";
import {InventoryWithControlsContainer} from "../InventoryWithControlsContainer";

type InventoryPageContainerProps = {
  page: number;
};

export const InventoryPageContainer = ({
  page,
}: InventoryPageContainerProps) => {
  const { data: pokemonCollection, error } = useSWR(
    getInventoryByPageKey(page),
    fetchInventoryByPage
  );

  if (error) return <div>Error InventoryPageContainer</div>;
  if (!pokemonCollection) return <LinearProgress />;

  return <InventoryWithControlsContainer pokemonCollection={pokemonCollection} />;
};
