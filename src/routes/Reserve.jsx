import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUpdateEffect } from 'usehooks-ts';
import Spinner from '../components/Spinner';
import { addReservation } from '../redux/slices/reservationSlice';
import { getVideogames } from '../redux/slices/videogameSlice';
import { selectReserveError, selectReserveLoading, selectVideogames } from '../redux/store';
import '../styles/login.scss';
import '../styles/reserve.scss';
import formatDate from '../utils/formatDate';

const Reserve = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videogames = useSelector(selectVideogames);
  const reserveLoading = useSelector(selectReserveLoading);
  const reserveError = useSelector(selectReserveError);
  const [searchParams] = useSearchParams();
  const initialVideogameId = Number(searchParams.get('videogameId')) || 0;
  const [videogameId, setVideogameId] = useState(initialVideogameId);
  const [days, setDays] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videogames) {
      dispatch(getVideogames());
    }
  }, [dispatch, videogames]);

  useEffect(() => {
    setError(reserveError);
  }, [reserveError]);

  useUpdateEffect(() => {
    if (!reserveLoading) {
      navigate('/myReservations');
    }
  }, [reserveLoading]);

  const handleDateChange = (e) => {
    const now = new Date();
    const userDate = new Date(e.target.value);
    const difference = userDate.getTime() - now.getTime();
    const differenceDays = Math.ceil(difference / (1000 * 3600 * 24));
    setDays(differenceDays);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videogameId === 0) {
      setError('Please select a videogame');
      return;
    }

    const relevantVideogame = videogames.find(
      (videogame) => videogame.attributes.id === videogameId,
    );
    const totalPrice = Number(relevantVideogame.attributes.price_per_day) * days;
    dispatch(
      addReservation({
        videogameId,
        days,
        totalPrice,
      }),
    );
  };

  const handleVideogameChange = (e) => {
    const newVideogameId = Number(e.target.value);
    setVideogameId(newVideogameId);
    if (newVideogameId !== 0) {
      setError(null);
    }
  };

  if (reserveError) {
    return <h1 className="text-center pt-5">{reserveError}</h1>;
  }

  if (!videogames) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="reserve-main-container">
      <div className="container">
        <div className="login-form">
          <h3 className="subtitle text-center">RESERVE A VIDEOGAME</h3>
          <hr className="green-line" />
          <p>Select the videogame you want to rent and the date you want to return it</p>
          <form
            className="row row-cols-1 row-cols-md-auto justify-content-center gy-2 mb-2"
            onSubmit={handleSubmit}
          >
            <div className="col d-flex justify-content-center">
              <select
                className="reserve-select"
                value={videogameId}
                onChange={handleVideogameChange}
                min={1}
              >
                <option value={0}>-- Select a videogame --</option>
                {videogames?.map((videogame) => {
                  const { id, attributes } = videogame;
                  const { id: videogameId, name } = attributes;

                  return (
                    <option key={id} value={videogameId}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col d-flex justify-content-center">
              <input
                required
                type="date"
                min={formatDate({ daysLater: 1, dateInput: true })}
                className="input"
                onChange={handleDateChange}
              />
            </div>
            <div className="col d-flex justify-content-center">
              <button type="submit" className="login-submit-button">
                Submit
              </button>
            </div>
          </form>
          {days !== 0 && (
          <p>
            * Your rent will last
            {' '}
            {days}
            {' '}
            day(s) *
          </p>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Reserve;
