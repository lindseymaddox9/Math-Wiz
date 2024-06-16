import { Link } from 'react-router-dom';
import hat from '../../assets/images/gold_wizard_hat_720.png';
import wand from '../../assets/images/wand4.png';
import Auth from '../../utils/auth';
import "./style.css"


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center banner image-size">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0"><img src={hat} alt="gold wizard hat" class="hat"></img>
              Math-Wiz
              <img src={wand} alt="math wand" class="wand"></img>
              </h1>
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <span class="name">Hey there, {Auth.getProfile().data.username}!</span>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-info m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
