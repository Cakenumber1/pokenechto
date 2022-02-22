import React from 'react';

export const naturalNumberPattern = /^[1-9]{1}[0-9]{0,}$/;

export type StatType = {
  statName: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed'
  statVal: number
};

// types
export type PokemonType = {
  id: number;
  name: string;
  img: string;
  abilities: string[];
  height: number;
  weight: number;
  stats: StatType[]
  types: string[];
  exp: number;
};

export type CollectionItemType = PokemonType & { collectionId: string };

export type HandleClickCard = (
  event: React.MouseEvent<HTMLDivElement>,
  collectionItem: CollectionItemType
) => void;

export type HandleClickPopoverControls = (
  event: React.MouseEvent<HTMLButtonElement>,
  buttonClicked: 'info' | 'gift'
) => void;
