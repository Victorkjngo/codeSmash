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
        <div className="col-sm-6 col-sm-offset-3">
            <h1><span className="fa fa-sign-in"></span> Login</h1>

            {//<% if (message.length) { %>}
            }
            <div className="alert alert-danger">{//<%= message %>}
            }
            </div>

            <form action="/login" method="post">
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password"/>
                </div>

                <button type="submit" className="btn btn-warning btn-lg">Login</button>
            </form>

            <hr/>
            <div>
                Or login with any of the following services:<br />
                <a><img src="/assets/google-logo.png" /></a>
            </div>
            <hr/>

            <p>Need to sign up for an account? <a href="/signup">Signup</a></p>
            <p><a href="/">home</a></p>

        </div>
      </div>
    );
  }
}


export default Login;