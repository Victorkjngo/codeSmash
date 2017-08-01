import React from 'react';

module.exports = () => {
  return (
    <div className="container">
      <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#my-modal">Invite</button>

      <div className="modal" id="my-modal" role="dialog">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>This is a small modal.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}