import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/match';
import { modalState, modalTypeState } from 'utils/recoil/modal';
import styles from 'styles/modal/Modal.module.scss';
import AdminModal from './modalType/AdminModal';
import NormalModal from './modalType/NormalModal';
import StoreModal from './modalType/StoreModal';

export default function ModalProvider() {
  const [{ modalName, isAttended }, setModal] = useRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const modalType = useRecoilValue(modalTypeState);

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalName]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modalName?.split('-')[0] === 'FIXED') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      console.log(isAttended);
      if (modalName === 'MATCH-CANCEL') setReloadMatch(true);
      else if (modalName === 'EVENT-ANNOUNCEMENT' && !isAttended) {
        setModal({ modalName: 'EVENT-WELCOME' });
      } else {
        setModal({ modalName: null });
      }
    }
  };

  return (
    modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        {modalType === 'NORMAL' ? (
          <NormalModal />
        ) : modalType === 'STORE' ? (
          <StoreModal />
        ) : modalType === 'ADMIN' ? (
          <AdminModal />
        ) : null}
      </div>
    )
  );
}
