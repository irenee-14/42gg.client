import Image from 'next/image';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { FaArrowRight } from 'react-icons/fa';
import { TbQuestionMark } from 'react-icons/tb';
import { UseItemRequest } from 'types/inventoryTypes';
import { modalState } from 'utils/recoil/modal';
import { userState } from 'utils/recoil/layout';
import { mockInstance } from 'utils/mockAxios';
import useUploadImg from 'hooks/useUploadImg';
import { ItemCautionContainer } from './ItemCautionContainer';
import {
  ModalButtonContainer,
  ModalButton,
} from 'components/modal/ModalButton';
import styles from 'styles/modal/store/InventoryModal.module.scss';

type ProfileImageProps = UseItemRequest;

const cautions = [
  '변경한 프로필 이미지는 취소할 수 없습니다.',
  '프로필 이미지는 50KB 이하의 jpg 파일만 업로드 가능합니다.',
  '관리자의 판단 하에 부적절한 이미지는 삭제될 수 있습니다.',
];

export default function ProfileImageModal({ receiptId }: ProfileImageProps) {
  const user = useRecoilValue(userState);
  const resetModal = useResetRecoilState(modalState);
  const { imgData, imgPreview, uploadImg } = useUploadImg();

  async function handleProfileImageUpload() {
    if (!imgData) {
      alert('이미지를 선택해주세요.');
      return;
    }
    try {
      const ret = await mockInstance.post(
        '/users/profile-image',
        {
          receiptId: receiptId,
          imgData: new Blob([imgData], { type: 'image/*' }),
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (ret.status === 201) {
        // NOTE : 테스트용 출력
        console.log(ret.data);
        alert('프로필 이미지가 변경되었습니다.');
        resetModal();
      } else throw new Error();
    } catch (error) {
      alert('프로필 이미지 변경에 실패했습니다.');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>프로필 이미지 변경</div>
      <div className={styles.phrase}>
        <div className={styles.section}>
          <form
            id='profile-image-form'
            className={styles.profilePreviewContainer}
          >
            <Image
              src={user.userImageUri}
              width={80}
              height={80}
              alt='profile image'
            />
            <FaArrowRight />
            <label>
              {imgPreview ? (
                <Image
                  src={imgPreview}
                  width={80}
                  height={80}
                  alt='new profile image'
                />
              ) : (
                <div className={styles.profilePreview}>
                  <TbQuestionMark />
                </div>
              )}
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={uploadImg}
              />
            </label>
          </form>
          <ItemCautionContainer caution={cautions} />
        </div>
        <ModalButtonContainer>
          <ModalButton
            style='negative'
            value='취소'
            onClick={() => resetModal()}
          />
          <ModalButton
            style='positive'
            value='변경하기'
            form='profile-image-form'
            onClick={() => handleProfileImageUpload()}
          />
        </ModalButtonContainer>
      </div>
    </div>
  );
}
