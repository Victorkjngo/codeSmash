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
        <div className="container">
          <div className="row">
            <div className="col-md-4">

              <section className="container">
                <div className="row white">
                      <div className="block">
                        <div>
                            <ul className="pricing p-yel">
                              <li>

                                <big>Good</big>
                              </li>
                              <li>Responsive Design</li>
                              <li>Color Customization</li>
                              <li><br/></li>
                              <li><br/></li>
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
            <div className="col-md-4">
              <section className="container">
                <div className="row white">
                      <div className="block">


                        <div>
                            <ul className="pricing p-green">
                              <li>

                                <big>Better</big>
                              </li>
                              <li>Responsive Design</li>
                              <li>Color Customization</li>
                              <li>HTML5 & CSS3</li>
                              <li><br/></li>
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
            <div className="col-md-4">
              <section className="container">
                <div className="row white">
                      <div className="block">


                        <div>
                            <ul className="pricing p-blue">
                              <li>

                                <big>Best</big>
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
          </div>
        </div>


        




      </div>
    );
  }
}

export default Pricing;



