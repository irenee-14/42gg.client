import dynamic from 'next/dynamic';
import { useSetRecoilState } from 'recoil';
import { MdPeopleAlt } from 'react-icons/md';
import { QUILL_FORMATS } from 'types/quillTypes';
import { TournamentInfo } from 'types/tournamentTypes';
import { modalState } from 'utils/recoil/modal';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/event/TournamentRegistryModal.module.scss';
import 'react-quill/dist/quill.bubble.css';

const Quill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function TournamentRegistryModal({
  title,
  contents,
  startTime,
  status,
  type,
  endTime,
  player_cnt,
}: TournamentInfo) {
  const setModal = useSetRecoilState(modalState);
  const Date = startTime.toString().split(':').slice(0, 2).join(':');

  const registTournament = () => {
    console.log('토너먼트에 등록하시겠습니까.');
  };

  const closeModalButtonHandler = () => {
    setModal({ modalName: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.closeButtonContainer}>
        <ModalButtonContainer>
          <ModalButton
            onClick={closeModalButtonHandler}
            value='X'
            style='close'
          />
        </ModalButtonContainer>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.tournamentInfo}>
        <div className={styles.startTime}>{Date}</div>
        <div className={styles.participants}>
          <MdPeopleAlt />
          <div className={styles.player}>{player_cnt} / 8</div>
        </div>
      </div>
      <Quill
        className={styles.quillViewer}
        readOnly={true}
        formats={QUILL_FORMATS}
        value={contents}
        theme='bubble'
      />
      <div>
        <ModalButtonContainer>
          <ModalButton
            onClick={registTournament}
            value='등록'
            style='positive'
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
