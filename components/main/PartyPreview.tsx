import { useRouter } from 'next/router';
import usePartyRoomList from 'hooks/party/usePartyRoomList';
import styles from 'styles/main/PartyPreview.module.scss';
export default function PartyPreview() {
  const { partyRooms } = usePartyRoomList();
  const openRooms = partyRooms.filter((room) => room.status === 'OPEN');
  const limitedRooms = openRooms.slice(0, 3);
  const router = useRouter();

  console.log(partyRooms);
  const movePartyRoom = (roomId: number) => {
    router.push(`/party/${roomId}`);
  };
  return (
    <div>
      <ul>
        {limitedRooms.map((room) => (
          <li
            key={room.roomId}
            className={styles.block}
            onClick={() => movePartyRoom(room.roomId)}
          >
            <div className={styles.divcontainer}>
              <div>{room.title}</div>
              <div>{`${room.currentPeople}/${room.maxPeople}`}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
