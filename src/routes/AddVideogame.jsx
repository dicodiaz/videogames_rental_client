import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'usehooks-ts';
import { addVideogame } from '../redux/slices/videogamesSlice';
import {
  selectAddVideogameError,
  selectAddVideogameLoading,
  selectVideogame,
} from '../redux/store';
import '../styles/add-videogame.scss';

const AddVideogame = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videogame = useSelector(selectVideogame);
  const addVideogameLoading = useSelector(selectAddVideogameLoading);
  const addVideogameError = useSelector(selectAddVideogameError);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState(0);

  const inputs = [
    {
      id: 0,
      placeholder: 'Name',
      type: 'text',
      value: name,
      action: setName,
    },
    {
      id: 1,
      placeholder: 'Image URL',
      type: 'text',
      value: photoURL,
      action: setPhotoURL,
    },
    {
      id: 2,
      placeholder: 'Description',
      type: 'text',
      value: description,
      action: setDescription,
    },
    {
      id: 3,
      placeholder: 'Price per day',
      type: 'number',
      value: pricePerDay,
      action: setPricePerDay,
      min: 0,
    },
  ];

  useUpdateEffect(() => {
    if (videogame) {
      navigate(`/videogames/${videogame.id}`);
    }
  }, [videogame]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addVideogame({
        name,
        photoURL,
        description,
        pricePerDay,
      }),
    );
  };

  return (
    <div className="reserve-main-container">
      <div className="container">
        <div className="login-form">
          <h3 className="subtitle text-center">ADD A VIDEOGAME</h3>
          <hr className="green-line" />
          <p>Add a videogame available for rent</p>
          <form
            className="row row-cols-1 row-cols-md-auto justify-content-center gy-2"
            onSubmit={handleSubmit}
          >
            {inputs.map((input) => (
              <div key={input.id} className="col d-flex justify-content-center">
                <input
                  value={input.value}
                  type={input.type}
                  min={input.min}
                  onChange={(e) => input.action(e.target.value)}
                  placeholder={input.placeholder}
                  className="input"
                  required
                />
              </div>
            ))}
            <div className="col d-flex justify-content-center">
              <button type="submit" className="login-submit-button">
                {addVideogameLoading ? <div className="spinner-border" /> : 'Save'}
              </button>
            </div>
          </form>
          {addVideogameError && (
            <div className="text-center mt-2">
              <small>
                *
                {' '}
                {addVideogameError}
                {' '}
                *
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVideogame;
