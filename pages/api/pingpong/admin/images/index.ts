import { NextApiRequest, NextApiResponse } from 'next';

const testData1 = {
  profileList: [
    {
      profileId: '12',
      date: '2023-08-05 10:10:10',
      intraId: 'hyungjpa',
      imageUrl: '/image/noti_empty.svg',
    },
  ],
  totalPage: 2,
};

const testData2 = {
  profileList: [
    {
      profileId: '1',
      date: '2023-08-04 10:10:10',
      intraId: 'hyungjpa',
      imageUrl: 'none',
    },
  ],
  totalPage: 2,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { page } = query as { page: string };

  if (method === 'GET') {
    if (page === '1') res.status(200).json(testData1);
    else res.status(200).json(testData2);
  }
}
