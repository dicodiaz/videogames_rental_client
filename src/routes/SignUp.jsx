import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../redux/slices/userSlice';
import { selectSignUpError, selectSignUpLoading } from '../redux/store';
import '../styles/sign-up.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpLoading = useSelector(selectSignUpLoading);
  const signUpError = useSelector(selectSignUpError);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUp({
        name,
        address,
        email,
        password,
      }),
    );
  };

  return (
    <div className="bg-form">
      <div className="container min-vh-100 text-white py-5">
        <div>
          <BiArrowBack className="fs-1" role="button" onClick={() => navigate('/login')} />
        </div>
        <div className="row mx-0 g-0 flex-grow-1 align-items-center">
          <div className="col">
            <h3 className="subtitle text-center">SIGN UP</h3>
            <div className="line-center">
              <hr className="green-line" />
            </div>
            <form
              className="row row-cols-1 row-cols-md-auto justify-content-center gy-2"
              onSubmit={handleSubmit}
            >
              <div className="col d-flex justify-content-center">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="input"
                  type="text"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="input"
                  type="text"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="input"
                  type="text"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input"
                  type="password"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <button type="submit" className="login-submit-button">
                  {signUpLoading ? <div className="spinner-border" /> : 'Submit'}
                </button>
              </div>
            </form>
            {signUpError && (
              <div className="text-center mt-2">
                <small>
                  *
                  {' '}
                  {signUpError}
                  {' '}
                  *
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
