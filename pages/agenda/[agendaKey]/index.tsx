import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { instanceInAgenda } from 'utils/axios';
import AgendaInfo from 'components/agenda/agendaDetail/AgendaInfo';
import AgendaTab from 'components/agenda/agendaDetail/AgendaTab';
import useFetchGet from 'hooks/agenda/useFetchGet';
import styles from 'styles/agenda/agendaDetail/AgendaDetail.module.scss';

const getIsHost = (intraId: string, agendaData?: AgendaDataProps | null) => {
  if (!agendaData) return false;
  return intraId === agendaData.agendaHost;
};

const useIntraId = (agendaKey: string) => {
  const [intraId, setIntraId] = useState<string>('');

  useEffect(() => {
    const fetchLoginData = async () => {
      if (agendaKey) {
        try {
          const res = await instanceInAgenda.get('profile/info');
          setIntraId(res.data.intraId);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchLoginData();
  });
  return intraId;
};

const AgendaDetail = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const teamUID = 1;

  const agendaData = useFetchGet<AgendaDataProps>(``, {
    agenda_key: agendaKey,
  }).data;

  // const { myTeam, isParticipant } = useMyTeam(agendaKey as string);
  const { data: myTeam, status: status } = useFetchGet<TeamDataProps>(
    `team/my`,
    { agenda_key: agendaKey }
  );

  const intraId = useIntraId(agendaKey as string);

  const isHost = getIsHost(intraId, agendaData);

  return (
    <>
      <div className={styles.agendaDetailWrap}>
        {agendaData ? (
          <>
            <AgendaInfo
              agendaData={agendaData}
              isHost={isHost}
              status={status}
            />
            <AgendaTab
              agendaData={agendaData}
              isHost={isHost}
              myTeam={myTeam}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}

        <div key={teamUID}>
          <Link href={`/agenda/${agendaKey}/${teamUID}`}>1번 팀</Link>
        </div>
      </div>
    </>
  );
};

export default AgendaDetail;
