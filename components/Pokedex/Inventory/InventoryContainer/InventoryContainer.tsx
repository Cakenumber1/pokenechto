// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';

import { InventoryLoader } from 'components/Pokedex/Inventory/InventoryLoader';
import { InventoryModal } from 'components/Pokedex/Inventory/InventoryModal';
import { InventoryPageContainer } from 'components/Pokedex/Inventory/InventoryPageContainer';
import { InventoryPopover } from 'components/Pokedex/Inventory/InventoryPopover';
import { CollectionItemType, HandleClickCard, HandleClickPopoverControls } from 'helpers/inventory/inventoryHelpers';
import { useAuth } from 'myFirebase/AuthContext';
import * as React from 'react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import {
  useDeleteInventoryItemMutation,
  usePatchInventoryItemMutation,
  usePostInventoryByPageQuery,
} from 'store/service';
import { Navigation, Pagination, Virtual } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as ISwiper } from 'swiper/types';

type InventoryContainerProps = {
  pageQuery: number;
};

export const InventoryContainer = ({ pageQuery }: InventoryContainerProps) => {
  const { currentUser } = useAuth()!;
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLElement | null>(null);
  const [isTopHalfOfScreen, setIsTopHalfOfScreen] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<CollectionItemType | null>(null);
  const { data, isError, isLoading } = usePostInventoryByPageQuery({
    page: pageQuery,
    uid: currentUser.uid,
  });
  const [deletePokemonCollection] = useDeleteInventoryItemMutation();
  const [patchPokemonCollection] = usePatchInventoryItemMutation();

  const handleSlideChange = (swiper: ISwiper) => {
    window.history.pushState(null, '', `/pokedex/inventory?page=${swiper.realIndex + 1}`);
  };

  const handleClickCard: HandleClickCard = (
    event,
    collectionItem,
  ) => {
    setPokemon(collectionItem);
    setPopoverAnchorElement(event.currentTarget);
    setIsTopHalfOfScreen(event.clientY > window.innerHeight / 2);
  };

  const handleClosePopover = () => {
    setPopoverAnchorElement(null);
  };

  const handleClickControls: HandleClickPopoverControls = (event) => {
    switch (event.currentTarget.dataset.buttonName) {
      case 'info':
        setModalOpen(true);
        handleClosePopover();
        break;
      case 'delete':
        if (pokemon !== null) {
          deletePokemonCollection({ uid: currentUser.uid, pid: pokemon.collectionId }).unwrap();
          handleClosePopover();
        }
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (isError) return <h1>error InventoryContainer</h1>;
  if (isLoading) return <InventoryLoader open />;
  if (!data) return <h1>NO DATA InventoryContainer</h1>;

  const activeSlide = pageQuery - 1;
  const perPage = 12;
  const slidesLength = Math.ceil(data.count / perPage);

  return (
    <>
      <Swiper
        style={{ height: '100%' }}
        modules={isMobile ? [Pagination, Virtual] : [Pagination, Navigation, Virtual]}
        navigation={!isMobile}
        allowTouchMove={isMobile}
        virtual
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        onSwiper={(swiper) => {
          swiper.slideTo(activeSlide, 0, false);
        }}
        onSlideChange={handleSlideChange}
      >
        {[...new Array(slidesLength)].map((_, slideIndex) => (
          <SwiperSlide key={slideIndex.toString()}>
            <InventoryPageContainer page={slideIndex + 1} onClickCard={handleClickCard} />
          </SwiperSlide>
        ))}
      </Swiper>
      {popoverAnchorElement && (
      <InventoryPopover
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
        isTopHalfOfScreenClicked={isTopHalfOfScreen}
        onClickControls={handleClickControls}
      />
      )}
      {modalOpen && (
        <InventoryModal
          open={modalOpen}
          pokemon={pokemon as CollectionItemType}
          onClose={handleCloseModal}
          onMushroom={() => {
            patchPokemonCollection({
              pid: pokemon!.collectionId,
              uid: currentUser.uid,
            });
          }}
        />
      )}
    </>
  );
};
