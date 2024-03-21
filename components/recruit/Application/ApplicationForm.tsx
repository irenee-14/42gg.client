import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box, Button, Grid, Paper } from '@mui/material';
import {
  ApplicationFormType,
  IApplicantAnswer,
  IQuestionForm,
  IRecruitmentDetail,
  refMap,
} from 'types/recruit/recruitments';
import { applicationAnswerSet } from 'utils/handleApplicationForm';
import {
  applicationAlertState,
  applicationModalState,
} from 'utils/recoil/application';
import ApplyEditModal from 'components/modal/recruitment/ApplyEditModal';
import CancelModal from 'components/modal/recruitment/CancelModal';
import MultiCheckForm from 'components/recruit/Application/applicationFormItems/MultiCheck';
import SingleCheckForm from 'components/recruit/Application/applicationFormItems/SingleCheck';
import TextForm from 'components/recruit/Application/applicationFormItems/TextForm';
import styles from 'styles/recruit/application.module.scss';

interface IApplicationFormProps {
  mode: ApplicationFormType;
  recuitId: number;
  applicationId: number | null;
  data: IRecruitmentDetail;
  answerList: IApplicantAnswer[] | null;
}

function ApplicationForm(props: IApplicationFormProps) {
  const { mode, recuitId, applicationId, data, answerList } = props;
  const formRefs = useRef<refMap>({});
  const modalState = useRecoilValue(applicationModalState);
  const setModalState = useSetRecoilState(applicationModalState);
  const setAlertState = useSetRecoilState(applicationAlertState);

  console.log(answerList);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const answerForms = applicationAnswerSet(formData, data.forms);

    // 입력하지 않은 문항으로 이동
    for (const ans of answerForms) {
      if (ans.inputType === 'TEXT' && ans.answer === '') {
        formRefs.current[ans.questionId].focus();
        setAlertState({
          alertState: true,
          message: '입력하지 않은 항목이 있습니다.',
          severity: 'error',
        });
        return;
      }
      if (
        (ans.inputType === 'SINGLE_CHECK' || ans.inputType === 'MULTI_CHECK') &&
        !ans.checkedList?.length
      ) {
        formRefs.current[ans.questionId].focus();
        setAlertState({
          alertState: true,
          message: '입력하지 않은 항목이 있습니다.',
          severity: 'error',
        });
        return;
      }
    }
    setModalState({
      state: true,
      content: mode === 'APPLY' ? 'APPLY' : 'EDIT',
      formData: answerForms,
    });
  };

  return (
    <Box>
      <form id='applicationForm' onSubmit={onSubmit}>
        <Grid
          className={styles.form}
          container
          direction={'column'}
          rowSpacing={2}
        >
          <Paper className={styles.titleContainer}>{data.title}</Paper>
          {data.forms.map((form: IQuestionForm, index: number) => (
            <Paper className={styles.questionContainer} key={index}>
              {form.inputType === 'TEXT' ? (
                <TextForm
                  form={form}
                  formRefs={formRefs}
                  mode={mode}
                  answer={answerList ? answerList[form.questionId - 1] : null}
                />
              ) : form.inputType === 'SINGLE_CHECK' ? (
                <SingleCheckForm
                  form={form}
                  formRefs={formRefs}
                  mode={mode}
                  answer={answerList ? answerList[form.questionId - 1] : null}
                />
              ) : form.inputType === 'MULTI_CHECK' ? (
                <MultiCheckForm
                  form={form}
                  formRefs={formRefs}
                  mode={mode}
                  answer={answerList ? answerList[form.questionId - 1] : null}
                />
              ) : (
                <span>잘못된 타입의 항목입니다</span>
              )}
            </Paper>
          ))}
          {mode === 'APPLY' && (
            <Button
              className={styles.submitBtn}
              variant='contained'
              type='submit'
              form='applicationForm'
            >
              제출하기
            </Button>
          )}
        </Grid>
      </form>
      {modalState.content === 'CANCEL' ? (
        <CancelModal recruitId={recuitId} applicationId={applicationId} />
      ) : (
        <ApplyEditModal
          recruitId={recuitId}
          applicationId={applicationId}
          mode={mode}
        />
      )}
    </Box>
  );
}

export default ApplicationForm;
