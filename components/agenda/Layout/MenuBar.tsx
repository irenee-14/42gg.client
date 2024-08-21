import { useUser } from 'hooks/agenda/Layout/useUser';
import styles from 'styles/agenda/Layout/MenuBar.module.scss';
import MenuBarContent from './MenuBarContent';

const MenuBar = () => {
  const user = useUser();

  return (
    <div className={styles.container}>
      <MenuBarContent
        content={`Hello. ${user?.intraId}`}
        href='/agenda/profile'
        as='h2'
      />
      <MenuBarContent content='Agenda' href='/agenda' as='h1' />
      <div className={styles.divider} />
      <MenuBarContent content='진행중인 대회' href='/agenda' />
      <MenuBarContent content='티켓 확인하기' href='/agenda/ticket' />
      {user?.isAdmin && (
        <>
          <MenuBarContent content='admin' href='/agenda/admin' as='h1' />
        </>
      )}
    </div>
  );
};

export default MenuBar;
