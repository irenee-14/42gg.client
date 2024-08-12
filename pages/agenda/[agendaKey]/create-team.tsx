import { useRouter } from 'next/router';
import { instanceInAgenda } from 'utils/axios';
import CreateTeamForm from 'components/agenda/Form/CreateTeamForm';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import styles from 'styles/agenda/pages/create-team.module.scss';

const CreateTeam = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const agendaInfo = useAgendaInfo(agendaKey as string);
  console.log(agendaInfo);

  const submitTeamForm = (target: React.FormEvent<HTMLFormElement>) => {
    target.preventDefault();
    const formData = new FormData(target.currentTarget);
    const strData = JSON.stringify(Object.fromEntries(formData));
    console.log(strData);
    const data = JSON.parse(strData);
    data.teamIsPrivate = data.teamIsPrivate === 'on' ? true : false;
    switch (data.teamLocation) {
      case '서울':
        data.teamLocation = 'SEOUL';
        break;
      case '경산':
        data.teamLocation = 'GYEONGSAN';
        break;
      case '둘다':
        data.teamLocation = 'MIX';
        break;
    }
    console.log(data);
    instanceInAgenda
      .post(`/team?agenda_key=${agendaKey}`, data)
      .then((res) => {
        console.log(res.data.teamKey);
        router.push(`/agenda/${agendaKey}/${res.data.teamKey}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>팀 만들기</h2>
      <p className={styles.description}>팀 인원 : 3명-8명까지 가능</p>
      <CreateTeamForm handleSubmit={submitTeamForm} />
    </div>
  );
};

export default CreateTeam;
