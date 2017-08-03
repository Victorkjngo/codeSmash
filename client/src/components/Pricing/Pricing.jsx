import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../Routes/NavBar.jsx';

class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <h1 className="pricing-header">
          Pricing
        </h1>



<section className="container">
  <div className="row white">
        <div className="block">


          <div className="col-xs-12 col-md-4">
              <ul className="pricing p-yel">
                <li>

                  <big>Good</big>
                </li>
                <li>Responsive Design</li>
                <li>Color Customization</li>
                <li>HTML5 & CSS3</li>
                <li>Styled elements</li>
                <li>
                  <h3>$299</h3>
                  <span>per month</span>
                </li>
                <li>
                  <button>Join Now</button>
                </li>
              </ul>
          </div>




        </div>
      </div>
  </section>




      </div>
    );
  }
}

export default Pricing;



