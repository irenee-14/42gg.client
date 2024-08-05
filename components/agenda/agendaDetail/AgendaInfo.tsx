import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { AgendaInfoProps } from 'types/agenda/agendaDetail/tabs/agendaInfoTypes';
import { AgendaStatus } from 'constants/agenda/agenda';
import { ShareBtn } from 'components/agenda/button/Buttons';
import { UploadBtn } from 'components/agenda/button/UploadBtn';
import styles from 'styles/agenda/agendaDetail/AgendaInfo.module.scss';

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url);
  alert('링크가 복사되었습니다.');
};

const participationIn = () => {
  alert('참여신청이 완료되었습니다.');
};

const hostMode = () => {
  alert('주최자 관리 버튼입니다.');
};

const makeTeam = () => {
  alert('팀 만들기 버튼입니다.');
};

const submitResults = () => {
  alert('결과 입력 버튼입니다.');
};

const isTeam = (agendaData: AgendaDataProps) => {
  return agendaData.agendaMinPeople !== agendaData.agendaMaxPeople;
};

// 버튼 텍스트 결정 함수
const determineButtonText = ({
  agendaData,
  isHost,
  isParticipant,
}: AgendaInfoProps) => {
  if (agendaData.agendaStatus === AgendaStatus.CONFIRM) {
    return isHost ? '결과입력' : '';
  } else if (agendaData.agendaStatus === AgendaStatus.OPEN) {
    if (isTeam(agendaData)) {
      return isHost ? '주최자 관리' : !isParticipant ? '팀 만들기' : '';
    } else {
      return isHost ? '주최자 관리' : !isParticipant ? '참가하기' : '';
    }
  }
  return '';
};

export default function AgendaInfo({
  agendaData,
  isHost,
  isParticipant,
}: AgendaInfoProps) {
  const buttonText = determineButtonText({
    agendaData,
    isHost,
    isParticipant,
  });
  const { agendaTitle, agendaHost } = agendaData;

  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.infoWarp}>
          <div className={styles.contentWarp}>
            <div className={styles.enrollWarp}>
              {buttonText !== '' && (
                <UploadBtn
                  text={buttonText}
                  onClick={
                    buttonText === '팀 만들기'
                      ? makeTeam
                      : buttonText === '참가하기'
                      ? participationIn
                      : buttonText === '주최자 관리'
                      ? hostMode
                      : submitResults
                  }
                />
              )}
            </div>
            <div className={styles.titleWarp}>
              <h2>{agendaTitle}</h2>
              <ShareBtn onClick={copyLink} />
            </div>
            <div className={styles.organizerWrap}>
              <span>주최자 : {agendaHost}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
