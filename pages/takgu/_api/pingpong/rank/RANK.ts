import { RankMain, userImages } from 'types/takgu/rankTypes';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankMain>
) {
  const userImages: userImages[] = [
    {
      intraId: 'jeyoon',
      imageUri: '/image/takgu/fallBackSrc.jpeg',
      tierImage: '/image/takgu/fallBackSrc.jpeg',
      edge: 'COLOR2',
    },
    {
      intraId: 'hyobicho',
      imageUri: '/image/takgu/fallBackSrc.jpeg',
      tierImage: '/image/takgu/fallBackSrc.jpeg',
      edge: 'COLOR3',
    },
    {
      intraId: 'hyungipa',
      imageUri: '/image/takgu/fallBackSrc.jpeg',
      tierImage: '/image/takgu/fallBackSrc.jpeg',
      edge: 'COLOR4',
    },
  ];

  const RankData: RankMain = {
    rankList: userImages,
  };

  res.status(200).json(RankData);
}
