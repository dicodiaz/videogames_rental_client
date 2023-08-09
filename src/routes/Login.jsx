import { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userSlice';
import { selectLoginError, selectLoginLoading } from '../redux/store';
import '../styles/login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginLoading = useSelector(selectLoginLoading);
  const loginError = useSelector(selectLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="bg-form">
      <div className="container min-vh-100 text-white py-5">
        <div>
          <BiArrowBack className="fs-1" role="button" onClick={() => navigate('/')} />
        </div>
        <div className="row mx-0 g-0 flex-grow-1 align-items-center">
          <div className="col">
            <h3 className="subtitle text-center">LOGIN</h3>
            <hr className="green-line" />
            <form
              className="row row-cols-1 row-cols-md-auto justify-content-center gy-2 mb-2"
              onSubmit={handleSubmit}
            >
              <div className="col d-flex justify-content-center">
                <input
                  placeholder="Email"
                  className="input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </div>
              <div className="col d-flex justify-content-center">
                <input
                  placeholder="Password"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <div className="col d-flex justify-content-center">
                <button type="submit" className="login-submit-button">
                  {loginLoading ? <div className="spinner-border" /> : 'Submit'}
                </button>
              </div>
            </form>
            <div className="text-center">
              <span>Don&apos;t have an account? </span>
              <Link to="/signup" className="underline">
                Create an account
              </Link>
            </div>
            {loginError && (
            <small>
              *
              {' '}
              {loginError}
              {' '}
              *
            </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
