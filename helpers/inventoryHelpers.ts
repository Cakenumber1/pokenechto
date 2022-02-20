import React from 'react';

export const naturalNumberPattern = /^[1-9]{1}[0-9]{0,}$/;

// types
export type PokemonType = {
  id: number;
  name: string;
  cp: number;
  exp: number;
  type: string[];
  abilities: string[];
  sprite: string;
  // stats: stat[]
  weight: number;
  height: number;
  // expType: enum;
};

export type CollectionItemType = PokemonType & { collectionId: number };

export type HandleClickCard = (
  event: React.MouseEvent<HTMLDivElement>,
  collectionItem: Partial<CollectionItemType>
) => void;

export type HandleClickPopoverControls = (
  event: React.MouseEvent<HTMLButtonElement>,
  buttonClicked: 'info' | 'gift'
) => void;
