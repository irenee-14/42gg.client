import { NextApiRequest, NextApiResponse } from 'next';
import { Iprofile } from 'types/admin/adminReceiptType';

interface IprofileRes {
  profileList: Array<Iprofile>;
  totalPage: number;
}

const profile1: Iprofile = {
  profileId: 1,
  date: new Date('2023-08-05 10:10:10'),
  intraId: 'hyungjpa',
  imageUrl: '/image/noti_empty.svg',
};

const profile2: Iprofile = {
  profileId: 2,
  date: new Date('2023-08-04 20:30:10'),
  intraId: 'hyobicho',
  imageUrl: '/image/noti_empty.svg',
};

const profile3: Iprofile = {
  profileId: 3,
  date: new Date('2023-07-05 10:10:10'),
  intraId: 'sangmipa',
  imageUrl: '/image/noti_empty.svg',
};

const profile4: Iprofile = {
  profileId: 4,
  date: new Date('2023-07-04 20:30:10'),
  intraId: 'jeyoon',
  imageUrl: '/image/noti_empty.svg',
};

const profile5: Iprofile = {
  profileId: 5,
  date: new Date('2023-07-01 10:10:10'),
  intraId: 'hyungjpa1',
  imageUrl: '/image/noti_empty.svg',
};

const profileList: Array<Iprofile> = [
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
];

const resEmpty: IprofileRes = {
  profileList: [],
  totalPage: 0,
};

const resOne: IprofileRes = {
  profileList: profileList.slice(0, 8),
  totalPage: 1,
};

const resTwo: IprofileRes = {
  profileList: profileList,
  totalPage: 3,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };

  // const temp: IprofileRes = resEmpty;
  // const temp: IprofileRes = resOne;
  const temp: IprofileRes = resTwo;

  const resData: IprofileRes = {
    profileList: [],
    totalPage: temp.totalPage,
  };

  if (method === 'GET') {
    if (page) {
      if (parseInt(page) === resData.totalPage) {
        resData.profileList = temp.profileList.slice(0, 5);
      } else {
        resData.profileList = temp.profileList;
      }
    }
    res.status(200).json(resData);
  }
}
