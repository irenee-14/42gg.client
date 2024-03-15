import { Stack } from '@mui/material';
import { resultType } from 'types/recruit/recruitments';
import { dateToKRFullString } from 'utils/handleTime';
import style from 'styles/recruit/Main/myRecruitment.module.scss';
import RecruitStepper from './RecruitStepper';

const MyRecruitStatus = ({
  status,
  interviewDate,
}: {
  status?: resultType;
  interviewDate?: Date;
}) => {
  if (!status)
    return (
      <div className={style.collapseContainer}>
        <span>지원 내역이 없습니다.</span>
      </div>
    );

  return (
    <div className={style.collapseContainer}>
      <Stack
        width={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={'2rem'}
      >
        <RecruitStepper status={status} />
        <span>{statusMessage(status, interviewDate)}</span>
      </Stack>
    </div>
  );
};

const statusMessage = (status: resultType, interviewDate?: Date) => {
  if (status === 'PROGRESS') return '지원서를 확인하고 있습니다.';
  if (status === 'INTERVIEW' && interviewDate)
    return dateToKRFullString(new Date(interviewDate));
  if (status === 'PASS') return '합격';
  if (status === 'APPLICATION_FAIL' || status === 'INTERVIEW_FAIL')
    return '불합격';
  return '';
};

export default MyRecruitStatus;
