import React, { Component } from 'react';
import { Invite, IntervieweeModal } from './index.jsx';
import _ from 'underscore';

class PlaygroundFooter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      questionList: [
        { topic: 'MinMoves',
          code: `var minMoves2 = function(nums) {\n\t/* \n\tInput:
\t[1,2,3]\n\tOutput: 2\n\tExplanation:\n\t\tOnly two moves are needed (remember each move increments or decrements one element):
\t[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
\t*/
};`
        },
        { topic: 'ZigZag Conversion',
          code: `var convert = function(s, numRows) {
\t/*
\t\tThe string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

\t\tP   A   H   N
\t\tA P L S I I G
\t\tY   I   R
\t\tAnd then read line by line: "PAHNAPLSIIGYIR"
\t\tWrite the code that will take a string and make this conversion given a number of rows:

\t\tstring convert(string text, int nRows);
\t\tconvert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".
\t*/  
};`
        },
        { topic: 'Valid Parenthesis',
          code: `var isValid = function(s) {
\t/*
\t\tGiven a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

\t\tThe brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.  
\t*/  
};`
        }
      ],
      selectTopic: ''
    };
    this.fireInjectQuestion = this.fireInjectQuestion.bind(this);
    this.injectQuestion = props.injectQuestion;
    this.uniqueLink = props.uniqueLink;
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
      <div className="navbar navbar-inverse navbar-fixed-bottom" id="footer-navbar">
        <div className="container">
          <ul className="nav navbar-nav">
            <li>
              <div className="col-md-1">
                <button onClick={ _ => {this.props.handleRunClick();}} className="run btn btn-primary btn-sm">Run</button>
              </div>
            </li>

            <li>
              <div className="col-md-1">
                <button onClick={ _ => {
                  this.props.handleClearClick();
                  this.props.emitClearEvent();  
                }}
                className="run btn btn-primary btn-sm"
                >Clear
                </button> 
              </div>
            </li>

            <li>
              <div className="col-md-1">
                <button onClick={ _ => {
                  this.props.saveCodeSnippet();
                }}
                className="run btn btn-primary btn-sm"
                >Save 
                </button>
              </div>
            </li>

            <li><Invite uniqueLink={this.uniqueLink}/></li>

            <li>
              <div className="col-md-1">
                <div className="dropdown">
                  <button className="btn btn-default btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span id="selected">Topics</span>
                    <span className="caret"></span>
                  </button>
                  <ul id="question_injector" className="dropdown-menu footer-dropup" aria-labelledby="dropdownMenu1">
                    {this.state.questionList.map((question, i) => <li key={i}>{question.topic}</li>)}
                  </ul>
                </div>
              </div>
            </li>

            <li>
              <div className="col-md-1">
                <button id="inject-question" className="btn btn-sucess btn-sm" onClick={this.fireInjectQuestion}>Inject</button>
              </div>
            </li>

          </ul>
        </div>
      </div>
    );
  }
} 

export default PlaygroundFooter;
