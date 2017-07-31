import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

class AttentionGrabber extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    return (
      <section className="attention-grabber">
        <Carousel axis="horizontal" dynamicHeight emulateTouch infiniteLoop autoPlay>
          <div>
            <img src="http://www.funnycatpix.com/_pics/Taking_A_Short_Ride.jpg" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="http://www.funnycatpix.com/_pics/Taking_A_Short_Ride.jpg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="http://www.funnycatpix.com/_pics/Taking_A_Short_Ride.jpg" />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </section>
    );
  }
}

export default AttentionGrabber;