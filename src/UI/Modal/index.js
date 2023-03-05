import React from "react";
import clsx from "clsx";
import s from "./styles.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { useAppContext } from "../../context";
import Image from "../../components/Modals/Image";
import Upload from "../../components/Modals/Upload";
import Unsplash from "../../components/Modals/Unsplash";
import Filter from "../../components/Modals/Filter";
import useClickAway from "../../hooks/useClickAway";
import Portal from "../../utils/Portal";
import RenderIf from "../../utils/RenderIf";
import Login from "../../components/Login";

const Modals = {
  imageModal: <Image />,
  UploadModal: <Upload />,
  UnsplashModal: <Unsplash />,
  LoginModal: <Login />,
  filterModal: <Filter />,
};

const Modal = ({ isFilterModal = false }) => {
  const { modalProps, closeModal, modalRef } = useAppContext();
  const ModalContent = () => Modals[modalProps.type];

  useClickAway(modalRef, () => {
    closeModal();
  });

  if (!modalProps.isOpen) return null;

  return (
    <Portal>
      <div className={s.modal_outer} onClick={closeModal} ref={modalRef}>
        <div
          className={clsx(s.modal_inner, {
            [s.filter_modal]: isFilterModal,
          })}
        >
          <RenderIf isTrue={!isFilterModal}>
            <button className={s.close_button} onClick={closeModal}>
              <MdOutlineClose />
            </button>
          </RenderIf>
          <div onClick={(e) => e.stopPropagation()} className={s.modal_content}>
            <ModalContent />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
