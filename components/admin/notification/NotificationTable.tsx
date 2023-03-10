import { useCallback, useEffect, useState } from 'react';
import { tableFormat } from 'constants/admin/table';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PageNation from 'components/Pagination';
import AdminSearchBar from 'components/admin/common/AdminSearchBar';
import CreateNotiButton from 'components/admin/notification/CreateNotiButton';
import styles from 'styles/admin/notification/NotificationTable.module.scss';
import instance from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';

const tableTitle: { [key: string]: string } = {
  notiId: 'ID',
  roleType: '권한',
  intraId: 'Intra ID',
  slotId: '슬롯 ID',
  type: '종류',
  message: '내용',
  createdTime: '생성일',
  isChecked: '확인 여부',
};

interface INotification {
  notiId: number;
  intraId: string;
  slotId: number;
  type: string;
  createdTime: Date;
  isChecked: boolean;
}

interface INotificaionTable {
  notiList: INotification[];
  totalPage: number;
  currentPage: number;
}

export default function NotificationTable() {
  const [notificationInfo, setNotificationInfo] = useState<INotificaionTable>({
    notiList: [],
    totalPage: 0,
    currentPage: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [intraId, setIntraId] = useState<string>('');

  const getUserNotifications = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/notifications?q=${intraId}&page=${currentPage}&size=10`
      );
      setIntraId(intraId);
      setNotificationInfo({
        notiList: res.data.notiList.map((noti: INotification) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(noti.createdTime)
          );
          return {
            ...noti,
            createdTime: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
      setNotificationInfo({ ...res.data });
    } catch (e) {
      console.error('MS00');
    }
  }, [intraId, currentPage]);

  const initSearch = useCallback((intraId?: string) => {
    setIntraId(intraId || '');
    setCurrentPage(1);
  }, []);

  const getAllUserNotifications = useCallback(async () => {
    try {
      const res = await instance.get(
        `pingpong/admin/notifications?page=${currentPage}&size=10`
      );
      setIntraId('');
      setNotificationInfo({
        notiList: res.data.notiList.map((noti: INotification) => {
          const { year, month, date, hour, min } = getFormattedDateToString(
            new Date(noti.createdTime)
          );
          return {
            ...noti,
            createdTime: `${year}-${month}-${date} ${hour}:${min}`,
          };
        }),
        totalPage: res.data.totalPage,
        currentPage: res.data.currentPage,
      });
    } catch (e) {
      console.error('MS01');
    }
  }, [currentPage]);

  useEffect(() => {
    intraId ? getUserNotifications() : getAllUserNotifications();
  }, [intraId, getUserNotifications, getAllUserNotifications]);

  return (
    <>
      <div className={styles.notificationWrap}>
        <div className={styles.header}>
          <span className={styles.title}>알림 관리</span>
          <AdminSearchBar initSearch={initSearch} />
          <CreateNotiButton />
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table className={styles.table} aria-label='customized table'>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                {tableFormat['notification'].columns.map((columnName) => (
                  <TableCell
                    className={styles.tableHeaderItem}
                    key={columnName}
                  >
                    {tableTitle[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {notificationInfo.notiList.length ? (
                notificationInfo.notiList.map((notification: INotification) => (
                  <TableRow
                    key={notification.notiId}
                    className={styles.tableRow}
                  >
                    {tableFormat['notification'].columns.map(
                      (columnName: string, index: number) => {
                        return (
                          <TableCell
                            className={styles.tableBodyItem}
                            key={index}
                          >
                            {notification[
                              columnName as keyof INotification
                            ]?.toString()}
                          </TableCell>
                        );
                      }
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>알림이 없습니다.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.pageNationContainer}>
          <PageNation
            curPage={notificationInfo.currentPage}
            totalPages={notificationInfo.totalPage}
            pageChangeHandler={(pageNumber: number) => {
              setCurrentPage(pageNumber);
            }}
          />
        </div>
      </div>
    </>
  );
}
