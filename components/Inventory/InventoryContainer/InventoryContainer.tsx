// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';

import { InventoryLoader } from 'components/Inventory/InventoryLoader';
import { InventoryModal } from 'components/Inventory/InventoryModal';
import { InventoryPageContainer } from 'components/Inventory/InventoryPageContainer';
import { InventoryPopover } from 'components/Inventory/InventoryPopover';
import { CollectionItemType, HandleClickCard, HandleClickPopoverControls } from 'helpers/inventoryHelpers';
import * as React from 'react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useDeleteInventoryItemMutation, useGetInventoryByPageQuery } from 'store/service';
import { Navigation, Pagination, Virtual } from 'swiper';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as ISwiper } from 'swiper/types';

type InventoryContainerProps = {
  pageQuery: number;
};

export const InventoryContainer = ({ pageQuery }: InventoryContainerProps) => {
  const [popoverAnchorElement, setPopoverAnchorElement] = useState<HTMLElement | null>(null);
  const [isTopHalfOfScreen, setIsTopHalfOfScreen] = useState(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Partial<CollectionItemType> | null>(null);
  const { data, isError, isLoading } = useGetInventoryByPageQuery(pageQuery);
  const [deleteCollection] = useDeleteInventoryItemMutation();

  const handleSlideChange = (swiper: ISwiper) => {
    window.history.pushState(null, '', `/inventory?page=${swiper.realIndex + 1}`);
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

  const handleClickControls: HandleClickPopoverControls = (event, buttonClicked) => {
    switch (buttonClicked) {
      case 'info':
        setModalOpen(true);
        handleClosePopover();
        break;
      case 'gift':
        deleteCollection({ collectionId: pokemon?.collectionId }).unwrap();
        handleClosePopover();
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
        pokemon={pokemon}
        onClose={handleCloseModal}
      />
      )}
    </>
  );
};
