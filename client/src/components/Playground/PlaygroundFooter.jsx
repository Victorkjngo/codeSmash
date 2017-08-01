import React from 'react';
import { Invite, IntervieweeModal } from './index.jsx';
import _ from 'underscore';

module.exports = (props) => (
  <div className="navbar navbar-inverse navbar-fixed-bottom">
    <div className="container">
      <ul className="nav navbar-nav">
        <li>
          <button onClick={ _ => {props.handleRunClick();}} className="run btn btn-primary btn-sm">Run</button>
        </li>

        <li>
          <button onClick={ _ => {
            props.handleClearClick();
            props.emitClearEvent();  
          }}
          className="run btn btn-primary btn-sm"
          >Clear
          </button> 
        </li>

        <li>
          <button onClick={ _ => {
            props.saveCodeSnippet();
          }}
          className="run btn btn-primary btn-sm"
          >Save 
          </button>
        </li>

        <li><Invite/></li>
      </ul>
    </div>
  </div>
)

        //  <div className="buttons"> 
        //   <button onClick={ _ => {
        //     this.handleRunClick();
        //   }} 
        //   className="run btn btn-primary btn-sm"
        //   >
        //   Run
        //   </button>  
        //   <button onClick={ _ => {
        //     this.handleClearClick();
        //     this.emitClearEvent();  
        //   }}
        //   className="run btn btn-primary btn-sm"
        //   >Clear
        //   </button>  

        //   <button onClick={ _ => {
        //     this.saveCodeSnippet();
        //   }}
        //   className="run btn btn-primary btn-sm"
        //   >Save 
        //   </button>

        //   <Invite/>
        // </div>