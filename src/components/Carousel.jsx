import PropTypes from 'prop-types';
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';
import '../styles/carousel.scss';
import Reservation from './Reservation';
import Videogame from './Videogame';

const Carousel = ({
  items, setPage, disabledLeft, disabledRight, deleteButton,
}) => {
  const handleLeftClick = () => {
    setPage((page) => page - 1);
  };

  const handleRightClick = () => {
    setPage((page) => page + 1);
  };

  return (
    <section id="carousel" className="row mx-0 g-0">
      <div className="col-auto d-flex flex-column justify-content-center">
        <button
          data-testid="btn-left"
          type="button"
          className="btn-carousel btn-left p-3"
          onClick={handleLeftClick}
          disabled={disabledLeft}
        >
          <BsCaretLeft className="fs-5" />
        </button>
      </div>
      <div className="col row mx-0 row-cols-1 row-cols-md-2 row-cols-xl-3">
        {items.map((item) => {
          const { id, type, attributes } = item;

          switch (type) {
            case 'videogame':
              return <Videogame key={id} data={attributes} deleteButton={deleteButton} />;
            case 'reservation':
              return <Reservation key={id} data={attributes} />;
            default:
              return null;
          }
        })}
      </div>
      <div className="col-auto d-flex flex-column justify-content-center">
        <button
          data-testid="btn-right"
          type="button"
          className="btn-carousel btn-right p-3"
          onClick={handleRightClick}
          disabled={disabledRight}
        >
          <BsCaretRight className="fs-5" />
        </button>
      </div>
    </section>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      attributes: PropTypes.oneOfType([Reservation.propTypes.data, Videogame.propTypes.data]),
    }),
  ).isRequired,
  setPage: PropTypes.func.isRequired,
  disabledLeft: PropTypes.bool.isRequired,
  disabledRight: PropTypes.bool.isRequired,
  deleteButton: PropTypes.bool,
};

Carousel.defaultProps = {
  deleteButton: false,
};

export default Carousel;
