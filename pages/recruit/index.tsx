import Lottie from 'lottie-react';
import { Button } from '@mui/material';
import RecruitList from 'components/recruit/RecruitList';
import recruitPingpong from 'public/lottie/recruitPingPong.json';
import useCheckRecruit from 'hooks/recruit/useCheckRecruit';
import commonStyle from 'styles/recruit/common.module.scss';
import layoutStyle from 'styles/recruit/layout.module.scss';
import textStyle from 'styles/recruit/text.module.scss';

function Recruit() {
  const { isRecruiting, isLoading } = useCheckRecruit();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!isLoading && !isRecruiting) {
    return (
      <div className={layoutStyle.recruitContainer}>
        <Lottie
          className={commonStyle.pingpongAnimation}
          animationData={recruitPingpong}
          width={'100%'}
        />
        <span className={textStyle.pageSubTitle}>
          지금은 신규 팀원 모집 기간이 아닙니다.
        </span>
        <Button size={'large'} variant={'contained'} color={'primary'} href='/'>
          42GG로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className={layoutStyle.recruitContainer}>
      <span className={textStyle.pageTitle}>42GG 팀원 모집</span>
      <Lottie
        className={commonStyle.pingpongAnimation}
        animationData={recruitPingpong}
        width={'100%'}
      />
      <RecruitList />
    </div>
  );
}

export default Recruit;
