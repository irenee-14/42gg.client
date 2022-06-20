import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import { PlayerInfo, GameResult } from '../../types/scoreTypes';
import styles from '../../styles/InputScoreModal.module.scss';

type GameProps = {
  gameId: number;
};

export default function InputScoreModal({ gameId }: GameProps) {
  const [myInfo, setMyInfo] = useState<PlayerInfo>({
    userId: '',
    userImageUri: '',
  });
  const [enemyInfo, setEnemyInfo] = useState<PlayerInfo>({
    userId: '',
    userImageUri: '',
  });
  const [result, setResult] = useState<GameResult>({
    myScore: 0,
    enemyScore: 0,
  });
  const [onCheck, setOnCheck] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(`/pingpong/games/result`);
        setMyInfo(res?.data.myTeam[0]);
        setEnemyInfo(res?.data.enemyTeam[0]);
      } catch (e) {
        // console.log(e);
      }
    })();
  }, []);

  const inputScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-2]/g, '');
    setResult((prev) => ({
      ...prev,
      [e.target.name]: +e.target.value,
    }));
  };

  const enterHandler = () => {
    const { myScore, enemyScore } = result;
    if (myScore + enemyScore > 3 || myScore === enemyScore) {
      alert('정확한 점수를 입력해주세요.');
      return;
    }
    if (myScore && enemyScore) {
      setOnCheck(true);
    }
  };

  const reEnterHandler = () => {
    if (result.myScore && result.enemyScore) {
      setResult((prev) => ({ ...prev, myScore: 0, enemyScore: 0 }));
      setOnCheck(false);
    }
  };

  const submitResultHandler = async () => {
    const res = await instance.post(`/pingpong/games/result`, result);
    if (res?.status === 201) {
      alert('결과 입력이 완료되었습니다.');
    } else if (res?.status === 202) {
      alert('결과가 입력된 게임입니다.');
    } else {
      alert('error occurred');
    }
    window.location.href = '/';
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.phrase}>{onCheck ? '경기 결과' : '경기가 끝났다면 점수를 입력해주세요.'}</div>
        <div className={styles.resultContainer}>
          <div className={styles.players}>
            <div className={styles.userInfo}>
              <div className={styles.userImage}></div>
              <div className={styles.userId}>{myInfo.userId}</div>
            </div>
            <div>vs</div>
            <div className={styles.userInfo}>
              <div className={styles.userImage}></div>
              <div className={styles.userId}>{enemyInfo.userId}</div>
            </div>
          </div>
          {onCheck ? (
            <div className={styles.finalScore}>
              <div>{result.myScore}</div>
              <div>:</div>
              <div>{result.enemyScore}</div>
            </div>
          ) : (
            <div className={styles.finalScore}>
              <div>
                <input id='myScore' name='myScore' onChange={inputScoreHandler} maxLength={1} />
              </div>
              <div>:</div>
              <div>
                <input id='enemyScore' name='enemyScore' onChange={inputScoreHandler} maxLength={1} />
              </div>
            </div>
          )}
        </div>
        {onCheck ? (
          <div className={styles.submitButton}>
            <input type='button' value='다시 입력하기' onClick={reEnterHandler} style={{ background: 'white', color: 'black' }} />
            <input type='button' value='제출하기' onClick={submitResultHandler} />
          </div>
        ) : (
          <div className={styles.submitButton}>
            <input type='button' value='확인' onClick={enterHandler} />
          </div>
        )}
      </div>
    </div>
  );
}
