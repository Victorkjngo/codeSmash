import React from 'react';
import Navbar from '../Routes/NavBar.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <div className="login-container">
            <div id="output"></div>
            <div className="avatar"></div>
            <div className="form-box">
                <form action="" method="">
                    <input name="user" type="text" placeholder="username"/>
                    <input type="password" placeholder="password"/>
                    <button className="btn btn-info btn-block login" type="submit">Login</button>
                </form>
            </div>
            <hr/> OR
            <div className="g-signin2">
              <a href="/auth/google"><img  src="/assets/btn_google_signin_light_normal_web.png" /></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;