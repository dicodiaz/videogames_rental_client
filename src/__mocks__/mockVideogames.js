export const mockVideogame = {
  id: '37',
  type: 'videogame',
  attributes: {
    id: 37,
    name: 'Street Fighter',
    photo: 'https://mms.businesswire.com/media/20230122005013/en/1692292/5/p1-1.jpg',
    description:
      'Street Fighter is a 1987 arcade game developed by Capcom. It is the first competitive fighting game produced by the company and the inaugural game in the Street Fighter series.',
    price_per_day: '20.0',
  },
};

const mockVideogames = [
  mockVideogame,
  {
    id: '36',
    type: 'videogame',
    attributes: {
      id: 36,
      name: 'Mortal Kombat',
      photo: 'https://thesource.com/wp-content/uploads/2017/10/862771.jpg',
      description:
        'Mortal Kombat is an American media franchise centered on a series of video games, originally developed by Midway Games in 1992.',
      price_per_day: '20.0',
    },
  },
];

export default mockVideogames;
