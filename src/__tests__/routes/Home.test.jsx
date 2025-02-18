import Home from '../../routes/Home';
import mockVideogames from '../../__mocks__/mockVideogames';
import renderWithProviders from '../test-utils';

describe('Home', () => {
  it('should render as expected', () => {
    const { container } = renderWithProviders(<Home />, {
      preloadedState: {
        videogameReducer: {
          videogames: mockVideogames,
        },
      },
    });
    expect(container).toMatchSnapshot();
  });
});
