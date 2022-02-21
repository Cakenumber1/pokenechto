export type NameAndUrl = {
  name: string,
  url: string
};

export type RawStat = {
  base_stat: number,
  effort: number,
  stat: NameAndUrl
};

type VersionDetail = {
  rarity: number,
  version: NameAndUrl
};

export type Types = {
  slot: number,
  type: NameAndUrl
};

export type HeldItem = {
  item: NameAndUrl,
  version_details: VersionDetail[]
};

export type GameIndex = {
  game_index: number,
  version: NameAndUrl
};

export type Ability = {
  ability: NameAndUrl,
  is_hidden: boolean,
  slot: number
};

type VersionGroupDetail = {
  level_learned_at: number,
  move_learned_method: NameAndUrl,
  version_group: NameAndUrl,
};

export type Move = {
  move: NameAndUrl,
  version_group_details: VersionGroupDetail[]
};

type OtherSprites = {
  dream_world: Partial<Sprite>,
  home: Partial<Sprite>
  official_artwork: Partial<Sprite>
};

export type Sprite = {
  back_default: string,
  back_female:string,
  back_shiny:string,
  back_shiny_female:string,
  front_default:string,
  front_female:string,
  front_shiny:string,
  front_shiny_female:string,
  other: OtherSprites,
  versions: any[]
};
