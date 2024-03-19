import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import { IApplicantAnswer } from 'types/recruit/recruitments';
import { mockInstance } from 'utils/mockAxios';
import {
  applicationModalState,
  userApplicationAnswerState,
  userApplicationInfo,
} from 'utils/recoil/application';
import styles from 'styles/modal/recruit/recruitModal.module.scss';

interface ISnackBarState extends SnackbarOrigin {
  snackBarOpen: boolean;
  message: string;
  severity: 'success' | 'error';
}

export default function ApplyModal() {
  const [snackBarState, setSnackBarState] = useState<ISnackBarState>({
    snackBarOpen: false,
    vertical: 'bottom',
    horizontal: 'left',
    message: '',
    severity: 'error',
  });

  const { recruitId } = useRecoilValue(userApplicationInfo);
  const applicantAnswers = useRecoilValue(userApplicationAnswerState);
  const [modalState, setModalState] = useRecoilState(applicationModalState);

  const { snackBarOpen, vertical, horizontal, message, severity } =
    snackBarState;

  const onModalClose = () => {
    setModalState({ state: false, content: 'NONE' });
  };

  const onSanckBarClose = () => {
    setSnackBarState({ ...snackBarState, snackBarOpen: false });
  };

  const { mutate } = useMutation(
    (applicantAnswers: IApplicantAnswer[]): Promise<AxiosResponse> => {
      return mockInstance.post(
        `/recruitments/${recruitId}/applications`,
        applicantAnswers
      );
    }
  );

  const onApply = () => {
    mutate(applicantAnswers, {
      onSuccess: () => {
        setSnackBarState((prev) => ({
          ...prev,
          snackBarOpen: true,
          message: '지원되었습니다.',
          severity: 'success',
        }));
        console.log(11, snackBarOpen);
        setModalState({ state: false, content: 'NONE' });
        // todo: 제출 후 recruit로 page 이동
      },
      onError: () => {
        setSnackBarState((prev) => ({
          ...prev,
          snackBarOpen: true,
          message: '요청에 문제가 발생했습니다.',
          severity: 'error',
        }));
      },
    });
  };

  return (
    <>
      <Modal onClose={onModalClose} open={modalState.state}>
        <Box className={styles.container}>
          <Typography align='center' variant='h5'>
            지원서를 제출할까요?
          </Typography>
          <Box className={styles.content}>
            <Typography>
              제출한 지원서는 제출 마감 전까지<br></br>수정하거나 삭제할 수
              있습니다.
            </Typography>
          </Box>
          <Box className={styles.btnContainer}>
            <Button
              className={styles.cancelBtn}
              variant='outlined'
              onClick={onModalClose}
              color={'secondary'}
            >
              취소
            </Button>
            <Button
              className={styles.applyBtn}
              variant='contained'
              onClick={onApply}
              color={'primary'}
            >
              제출하기
            </Button>
          </Box>
          <Snackbar
            open={snackBarOpen}
            anchorOrigin={{ vertical, horizontal }}
            onClose={onSanckBarClose}
            autoHideDuration={6000}
          >
            <Alert
              onClose={onSanckBarClose}
              severity={severity}
              variant={'filled'}
            >
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </>
  );
}
