import React, { Component } from 'react';
import { Invite, IntervieweeModal } from './index.jsx';
import _ from 'underscore';

class PlaygroundFooter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questionList: [
        { topic: 'Apples',
          code: `console.log('Apples')`
        },
        { topic: 'Bananas',
          code: `console.log('Bananas')`
        },
        { topic: 'Pineapples',
          code: `console.log('Pineapples')`
        }
      ],
      selectTopic: ''
    };
    this.fireInjectQuestion = this.fireInjectQuestion.bind(this);
    this.injectQuestion = props.injectQuestion;
  }

  componentDidMount () {
    // Add event listeners
    document.querySelectorAll('.dropdown-menu li').forEach(el => {
      el.addEventListener('click', _ => {
        var clickedQuestion = el.textContent;
        this.changeSelectedQuestion(clickedQuestion);
      });
    });

  }

  changeSelectedQuestion (selected) {
    document.getElementById('selected').textContent = selected;
    this.setState({selectTopic: selected});
  }

  fireInjectQuestion () {
    var selectTopic = this.state.selectTopic;
    if (!!selectTopic) {
      for (var i = 0; i < this.state.questionList.length; i++) {
        var { topic, code } = this.state.questionList[i];
        if (topic === selectTopic) {
          this.injectQuestion(code);
        }
      }
    }
  }

  render () {
    return (
      <div className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container">
          <ul className="nav navbar-nav">
            <li>
              <button onClick={ _ => {this.props.handleRunClick();}} className="run btn btn-primary btn-sm">Run</button>
            </li>

            <li>
              <button onClick={ _ => {
                this.props.handleClearClick();
                this.props.emitClearEvent();  
              }}
              className="run btn btn-primary btn-sm"
              >Clear
              </button> 
            </li>

            <li>
              <button onClick={ _ => {
                this.props.saveCodeSnippet();
              }}
              className="run btn btn-primary btn-sm"
              >Save 
              </button>
            </li>

            <li><Invite/></li>

            <li>
              <div className="dropdown"> 
                <button className="btn btn-default btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <span id="selected">Topics</span>
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu footer-dropup" aria-labelledby="dropdownMenu1">
                  {/* Voodoo magic below */}
                  {this.state.questionList.map((question, i) => <li key={i}>{question.topic}</li>)}
                </ul>
              </div>
            </li>

            <li><button id="inject-question" className="btn btn-sucess btn-sm" onClick={this.fireInjectQuestion}>Inject</button></li>

          </ul>
        </div>
      </div>
    );
  }
} 

export default PlaygroundFooter;
