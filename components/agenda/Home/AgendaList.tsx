import Link from 'next/link';
import React, { useState } from 'react';
import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import AgendaDeadLine from 'components/agenda/Home/AgendaDeadLine';
import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/Home/AgendaList.module.scss';

const AgendaList = ({ agendaList }: { agendaList: AgendaDataProps[] }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(0);

  return (
    <div className={styles.container}>
      <div className={styles.agendaListContainer}>
        <div className={styles.agendaListItemContainer}>
          {!agendaList || !agendaList.length ? (
            <div>
              <div className={styles.emptyContainer}>일정이 없습니다.</div>
            </div>
          ) : (
            agendaList.map((agendaInfo, idx) => (
              <AgendaListItem agendaInfo={agendaInfo} key={idx} />
            ))
          )}
        </div>
      </div>
      <AgendaListItem
        agendaInfo={agendaList[selectedItem || 0]}
        key={selectedItem || 0}
        className={styles.selectedItem}
      />
    </div>
  );
};

const AgendaListItem = ({
  agendaInfo,
  key,
  className,
}: {
  agendaInfo: AgendaDataProps;
  key: number;
  className?: string;
}) => {
  return (
    <Link
      href={`/agenda/${agendaInfo.agendaKey}`}
      className={className ? className : undefined}
    >
      <button className={styles.agendaListItemBtn} key={key}>
        <AgendaInfo agendaInfo={agendaInfo} key={key} />
        <AgendaDeadLine />
      </button>
    </Link>
  );
};

export default AgendaList;
