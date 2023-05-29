import { useSetRecoilState } from 'recoil';
import { reloadMatchState } from 'utils/recoil/match';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { instance } from 'utils/axios';
import { NewMatchMode } from 'types/mainType';

interface EnrollProps {
  startTime: string;
  mode: NewMatchMode | undefined;
}

const useMatchEnrollModal = ({ startTime, mode }: EnrollProps) => {
  const setError = useSetRecoilState(errorState);
  const setModal = useSetRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const enrollResponse: { [key: string]: string } = {
    SUCCESS: '경기가 성공적으로 등록되었습니다.',
    MA100: '해당 슬롯을 불러올 수 없습니다.',
    MA303: '경기 등록에 실패하였습니다.',
    MA300: '이미 등록이 완료된 경기입니다.',
    MA301: '경기 취소 후 1분 동안 경기를 예약할 수 없습니다.',
    MA302: '패널티를 부여받은 유저는 경기에 등록할 수 없습니다.',
  };
  //type any
  const onEnroll = async () => {
    try {
      const body = { startTime: startTime.slice(0, -3), mode: mode };
      await instance.post(`/pingpong/match?type=${mode}`, body);
      alert(enrollResponse.SUCCESS);
    } catch (e: any) {
      console.log(e);
      if (e.response.data.code in enrollResponse)
        alert(enrollResponse[e.response.data.code]);
      else {
        setModal({ modalName: null });
        setError('JH05');
        return;
      }
    }
    setModal({ modalName: null });
    setReloadMatch(true);
  };

  const onCancel = () => {
    setModal({ modalName: null });
  };

  return { onEnroll, onCancel };
};

export default useMatchEnrollModal;
