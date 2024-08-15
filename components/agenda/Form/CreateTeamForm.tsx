import { AgendaLocation } from 'constants/agenda/agenda';
import styles from 'styles/agenda/Form/Form.module.scss';
import FormBtn from '../button/FormButton';
import CheckBoxInput from '../Input/CheckboxInput';
import DescriptionInput from '../Input/DescriptionInput';
import SelectInput from '../Input/SelectInput';
import TitleInput from '../Input/TitleInput';

interface CreateTeamFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  location: AgendaLocation | null;
}

const CreateTeamForm = ({ handleSubmit, location }: CreateTeamFormProps) => {
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TitleInput
        name='teamName'
        label='팀 이름'
        // defaultValue={teamDetail && teamDetail.teamName}
        placeholder='팀 이름을 입력해주세요'
      />
      <CheckBoxInput
        name='teamIsPrivate'
        label='비밀방(초대만 가능, 대회 내역에서 보이지 않음)'
      />
      {location === 'MIX' ? (
        <SelectInput
          name='teamLocation'
          label='클러스터 위치'
          options={['서울', '경산', '둘다']}
        />
      ) : (
        <input type='hidden' name='teamLocation' value={location || ''} />
      )}
      <DescriptionInput
        name='teamContent'
        label='팀 설명'
        placeholder='팀 설명을 입력해주세요'
      />
      <div className={styles.buttonContainer}>
        <FormBtn
          label='취소'
          onClick={(e) => {
            e.preventDefault();
          }}
        />
        <FormBtn label='팀 생성' submit={true} />
      </div>
    </form>
  );
};

export default CreateTeamForm;
