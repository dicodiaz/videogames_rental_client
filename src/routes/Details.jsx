import { useEffect } from 'react';
import { BiGame } from 'react-icons/bi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import colorWheel from '../assets/color_wheel.png';
import Spinner from '../components/Spinner';
import { getVideogame } from '../redux/slices/videogameSlice';
import { selectVideogame, selectVideogameError } from '../redux/store';
import '../styles/details.scss';

const pricingTable = [
  { text: 'Price per day', multiplier: 1 },
  { text: 'Price per week', multiplier: 7 },
  { text: 'Price per month', multiplier: 30 },
];

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const videogame = useSelector(selectVideogame);
  const videogameError = useSelector(selectVideogameError);
  const { id: videogameId } = videogame ?? {};

  useEffect(() => {
    if (id !== videogameId) {
      dispatch(getVideogame(id));
    }
  }, [dispatch, id, videogameId]);

  if (videogameError) {
    return <h1 className="text-center pt-5">{videogameError}</h1>;
  }

  if (!videogame) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <Spinner />
      </div>
    );
  }

  const { attributes } = videogame;
  const { name, photo, description, price_per_day: pricePerDay } = attributes;

  return (
    <section className="details-section">
      <img src={photo} alt={name} className="thumbnail" />
      <div className="details">
        <h2 className="title">{name}</h2>
        <p className="description">{description}</p>

        <table className="pricing-table">
          <tbody>
            {pricingTable.map((item) => (
              <tr key={item.text}>
                <td>
                  {item.text} <span>${pricePerDay * item.multiplier}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/" className="discover-button">
          Discover more videogames <span>&gt;</span>
        </Link>

        <div className="image-container">
          <BiGame className="icon" />
          <img src={colorWheel} alt="color wheel" className="color-wheel" />
        </div>

        <Link to={`/reserve?videogameId=${id}`} className="reserve-button">
          Reserve
          <MdKeyboardArrowRight className="icon" />
        </Link>
      </div>
    </section>
  );
};

export default Details;
