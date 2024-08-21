import Link from 'next/link';
import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Logo from 'public/image/main-logo.svg';
import styles from 'styles/agenda/Layout/Header.module.scss';

interface HeaderContextState {
  openMenuState: boolean;
  setOpenMenuBarState: Dispatch<SetStateAction<boolean>>;
  resetOpenMenuBarState: () => void;
}

const HeaderContext = createContext<HeaderContextState | null>(null);

export default function AgendaHeader() {
  const [menu, setMenu] = useState<boolean>(false);

  const resetMenuHandler = () => {
    setMenu(false);
  };

  const HeaderState: HeaderContextState = {
    openMenuState: menu,
    setOpenMenuBarState: setMenu,
    resetOpenMenuBarState: resetMenuHandler,
  };

  return (
    <HeaderContext.Provider value={HeaderState}>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrap}>
          <div className={styles.headerLeft}>
            <Link href='/'>
              <Logo className={styles.logo} />
            </Link>
          </div>
          <FiMenu
            className={styles.menuIcon}
            onClick={() => HeaderState?.setOpenMenuBarState(!menu)}
          />
        </div>
      </div>
      {HeaderState?.openMenuState && <div>menu</div>}
    </HeaderContext.Provider>
  );
}
