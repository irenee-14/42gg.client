import NormalGame from 'components/modal/afterGame/NormalGame';
import ScoreGame from 'components/modal/afterGame/ScoreGame';
import useCurrentGame from 'hooks/modal/aftergame/useCurrentGame';
import useSubmitModal from 'hooks/modal/aftergame/useSubmitModal';

export default function AfterGameModal() {
  const { currentGame } = useCurrentGame();
  const { submitScoreHandler, submitNormalHandler, openStatChangeModal } =
    useSubmitModal(currentGame);

  if (currentGame.startTime === '2022-07-13 11:50') return null;

  return currentGame.mode === 'NORMAL' ? (
    <NormalGame
      currentGame={currentGame}
      onSubmit={submitNormalHandler}
      openStatChange={openStatChangeModal}
    />
  ) : (
    <ScoreGame
      currentGame={currentGame}
      onSubmit={submitScoreHandler}
      openStatChange={openStatChangeModal}
    />
  );
}
