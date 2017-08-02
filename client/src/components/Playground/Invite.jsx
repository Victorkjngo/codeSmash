import React from 'react';

module.exports = ({uniqueLink}) => {
  return (
    <div className="dropup" >
      <button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" id="invite">Invite
      <span className="caret"></span></button>
      <div className="dropdown-menu footer-dropup" id="invite-dropup" >
        <h4>Unique URL to Your Room</h4>
        <li className="divider"></li>
        <div id="#shortlink">
          <span>{uniqueLink}</span>
        </div>
      </div>
    </div>
  );
};