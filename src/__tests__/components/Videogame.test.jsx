import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Videogame from '../../components/Videogame';
import mockVideogames, { mockVideogame } from '../../__mocks__/mockVideogames';
import renderWithProviders from '../test-utils';

describe('Videogame', () => {
  it('should render as expected', () => {
    const { container } = renderWithProviders(<Videogame data={mockVideogame.attributes} />);
    expect(container).toMatchSnapshot();
  });

  it('should delete videogame from the store when clicking the delete button', async () => {
    const { store, getByRole } = renderWithProviders(
      <Videogame data={mockVideogame.attributes} deleteButton />,
      {
        preloadedState: {
          videogameReducer: {
            videogames: mockVideogames,
          },
        },
      },
    );

    axios.delete.mockResolvedValue({ status: 200, data: { message: '' } });
    expect(store.getState().videogameReducer.videogames.includes(mockVideogame)).toBeTruthy();
    await userEvent.click(getByRole('button', { name: 'Delete' }));
    expect(store.getState().videogameReducer.videogames.includes(mockVideogame)).toBeFalsy();
  });
});
