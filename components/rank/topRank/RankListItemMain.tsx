import Link from 'next/link';
import React, { useContext } from 'react';
import { RankUser, NormalUser } from 'types/rankTypes';
import styles from 'styles/rank/RankListMain.module.scss';
import PlayerImage from 'components/PlayerImage';
import { ToggleModeContext } from '../RankList';
interface RankListItemMainProps {
  user: NormalUser | RankUser;
}

export default function RankListItemMain({ user }: RankListItemMainProps) {
  const { rank, intraId, userImageUri } = user;
  const rankFiltered = rank < 0 ? '-' : rank;
  const toggleMode = useContext(ToggleModeContext);

  return (
    <div
      className={`${styles.mainData} ${
        toggleMode === 'NORMAL' && styles.normal
      }`}
    >
      <div
        className={`${rank === 1 ? styles.leaf : ''} ${
          toggleMode === 'NORMAL' && styles.normal
        }`}
      >
        <div
          className={`${rank === 1 ? styles.leaf1 : ''} ${
            toggleMode === 'NORMAL' && styles.normal
          }`}
        >
          <div
            className={`${styles.intraId} ${rank === 1 && styles.first} ${
              rank === 3 && styles.last
            }`}
          >
            <Link href={`users/detail?intraId=${intraId}`}>
              <PlayerImage
                src={userImageUri}
                styleName={rank === 1 ? 'ranktropybig' : 'ranktropy'}
                size={50}
              />
              <span>{intraId}</span>
            </Link>
          </div>
          <div
            className={`${
              rank === 1
                ? styles.rankNumber1
                : rank === 2
                ? styles.rankNumber2
                : styles.rankNumber3
            } ${toggleMode === 'NORMAL' && styles.normal}`}
          >
            {rankFiltered}
          </div>
        </div>
      </div>
    </div>
  );
}
