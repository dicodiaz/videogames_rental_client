import { BiArrowBack } from 'react-icons/bi';
import '../styles/Login.scss';
import { useNavigate } from 'react-router-dom';
import '../styles/reserve.css';

const mockData = [
  {
    id: 1,
    name: 'Zelda: Breath of the wild', 
    photo: 'http://fakeurl.com',
    description: 'A very interesting game', 
    price_per_day: 20
  },
  {
    id: 2,
    name: 'Hogwarts Legacy', 
    photo: 'http://fakeurl.com',
    description: 'A very interesting game', 
    price_per_day: 30
  },
  {
    id: 3,
    name: 'God of war', 
    photo: 'http://fakeurl.com',
    description: 'A very interesting game', 
    price_per_day: 35
  },
];
const Reserve = () => {
  const navigate = useNavigate();
  return (
    <div className="login-main-container">
      <div className="container">
        <div className="login-header">
          <BiArrowBack className="back-icon" onClick={() => navigate('/')} />
        </div>
        <div className="login-form">
          <h3 className="subtitle text-center">LOGIN</h3>
          <hr className="green-line" />
          <div className="login-inputs">
            <input placeholder="Email" className="input" />
            <input placeholder="Password" className="input" />
            <button type="button" className="login-submit-button">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Reserve;
