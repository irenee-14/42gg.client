import {
  TeamButtonsProps,
  BtnInfoProps,
} from 'types/agenda/teamDetail/TeamButtonsTypes';
import { Authority, TeamStatus } from 'constants/agenda/agenda';
import styles from 'styles/agenda/TeamDetail/TeamButtons.module.scss';

const renderButton = (
  firstBtnInfo: BtnInfoProps,
  secondBtnInfo?: BtnInfoProps
) => {
  return (
    <div className={styles.buttonContainer}>
      {firstBtnInfo ? (
        <button className={styles.button} onClick={firstBtnInfo.handleClick}>
          {firstBtnInfo.label}
        </button>
      ) : null}

      {secondBtnInfo ? (
        <button
          className={styles.confirm_button}
          onClick={secondBtnInfo.handleClick}
        >
          {secondBtnInfo.label}
        </button>
      ) : null}
    </div>
  );
};

const TeamButtons = ({
  authority,
  teamStatus,
  manageTeamDetail,
}: TeamButtonsProps) => {
  switch (teamStatus) {
    case TeamStatus.CANCEL:
      return null;
    case TeamStatus.CONFIRM:
      if (authority === Authority.LEADER) {
        return renderButton({
          handleClick: () =>
            manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
          label: '폭파하기',
        });
      } else {
        return null;
      }
    case TeamStatus.OPEN:
      if (authority === Authority.GEUST) {
        return renderButton({
          handleClick: () =>
            manageTeamDetail && manageTeamDetail('POST', 'team/join'),
          label: '참가하기',
        });
      } else if (authority === Authority.MEMBER) {
        return renderButton({
          handleClick: () =>
            manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
          label: '나가기',
        });
      } else if (authority === Authority.LEADER) {
        return renderButton(
          {
            handleClick: () =>
              manageTeamDetail && manageTeamDetail('PATCH', 'team/cancel'),
            label: '폭파하기',
          },
          {
            handleClick: () =>
              manageTeamDetail && manageTeamDetail('PATCH', 'team/confirm'),
            label: '확정하기',
          }
        );
      } else {
        /** NONE, HOST */
        return null;
      }
  }
  return null;
};

export default TeamButtons;
