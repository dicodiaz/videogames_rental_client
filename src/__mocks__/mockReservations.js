export const mockReservation = {
  id: '17',
  type: 'reservation',
  attributes: {
    id: 17,
    user_id: 10,
    days: 2,
    total_price: '10.0',
    created_at: '2023-08-10T20:01:19.767Z',
    videogame: {
      id: 31,
      name: 'Tetris',
      photo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Tetris_NES_cover_art.jpg/220px-Tetris_NES_cover_art.jpg',
      description:
        'Tetris is a puzzle video game created in 1984 by Alexey Pajitnov, a Soviet software engineer.',
      price_per_day: '5.0',
    },
  },
};

const mockReservations = [
  mockReservation,
  {
    id: '16',
    type: 'reservation',
    attributes: {
      id: 16,
      user_id: 10,
      days: 3,
      total_price: '30.0',
      created_at: '2023-08-10T20:01:19.759Z',
      videogame: {
        id: 30,
        name: 'Super Mario Bros',
        photo: 'https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png',
        description:
          'Super Mario Bros is a platform game developed and published by Nintendo. The successor to the 1983 arcade game Mario Bros. and the first game in the Super Mario series, it was first released in 1985 for the Famicom in Japan.',
        price_per_day: '10.0',
      },
    },
  },
];

export default mockReservations;
