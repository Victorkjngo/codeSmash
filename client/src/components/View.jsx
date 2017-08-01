import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Playground, Terminal, WebRTC, PlaygroundFooter } from './Playground/index.jsx';
import Navbar from './Routes/NavBar.jsx';
import xTerm from 'xterm';
import io from 'socket.io-client';
import axios from 'axios';

class View extends Component {
  constructor(props) {
    super(props);
    var socket = new io({
      transports: ['websocket']
    });

    this.state = {
      terminal: undefined,
      socket: socket,
      editorCode: `function myScript() {\n\tconsole.log('Returning 100');\n\treturn 100;\n}\nconsole.log(myScript());\n`,
      interviewee: null
    };

    xTerm.loadAddon('fit');
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.saveCodeSnippet = this.saveCodeSnippet.bind(this);
  }

  changeSelectedQuestion (selected) {
    document.getElementById('selected').textContent = selected;
  }

  componentDidMount () {
    var options = {
      cursorBlink: true,
      tabStopWidth: 4
    };
    var term = new xTerm(options);

    this.setState({terminal: term}, _ => {
      term.open(document.getElementById('terminal'));
      term.fit();
      term.blur();

      this.state.socket.on('executed_code', (output) => {
        this.writeTerminal(output);
      });

      this.state.socket.on('cleared_terminal', (output) => {
        this.state.terminal.clear();
      });

      this.state.socket.on('connect', () => {
        console.log('Connected to socket. Id:', this.state.socket.id);
      });

      // Error handling
      this.state.socket.on('error', function (error) {
        console.log('Error', error);
      });

      this.state.socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
      });

    });

    document.querySelectorAll('.dropdown-menu li').forEach(el => {
      el.addEventListener('click', _ => {
        var clickedQuestion = el.textContent;
        this.changeSelectedQuestion(clickedQuestion);
      });
    });

  }

  handleClearClick () {
    this.state.terminal.clear();
  }


  writeTerminal (output) {
    var {result, logs, error, longError} = output;

    if (logs.length > 1) {
      this.state.terminal.writeln(logs.join(''));
    } else {
      this.state.terminal.writeln(logs.join('\n'));
    }

    if (error) {
      this.state.terminal.writeln(result); // when there's an error, result will become a error message
    }

  }

  handleRunClick () {
    let code = document.getElementById('code').value;
    var payload = {
      code: code
    };

    // Socket io emit
    payload = JSON.stringify(payload);

    var headers = new Headers({
      'Content-Type': 'application/json'
    });

    var options = {
      method: 'POST',
      body: payload,
      headers: headers
    };

    fetch('run', options)
      .then((res) => {
        res.text()
          .then(output => {
            output = JSON.parse(output);
            console.log('Response from server:', output, typeof output);

            this.state.socket.emit('executed_code', output);
            this.writeTerminal(output);

          });
      })
      .catch(function(error) {
        console.error(error);
      });

  }

  saveCodeSnippet() {
    var dummyData = {
      'id': '5',
      'email': 'junjunparkpark@gmail.com',
      'hash': 'lniuisfdb872378yw',
      'image_url': 'http://www.google.com/jnsdkjfnks/',
      'url': 'http://linkedin.com/in/junjunparkpark',
      'first_name': 'Jun',
      'last_name': 'Park',
      'company': 'Hack Reactor',
      'title': 'Student',
      'location': {
        'city': 'San Francisco',
        'state': 'CA'
      },
      'interviews': [
        {
          'start_time': '06:30',
          'room_url': 'jln9327rh9',
          'interviewee': 'Matt',
          'code': [
            {
              'time': '07:00',
              'code_snippet': JSON.stringify(this.state.editorCode)
            }
          ]
        }
      ]
    };

    axios.post('/api/users', dummyData)
      .then(res => {
        console.log('Successful POST for User', res.data);
        this.fetch();
      })
      .catch(err => {
        console.log('ERROR creating a user:', err);
      });
  }

  fetch() {
    axios.get('/api/users')
      .then(res => {
        console.log('Successful GET from Users in DB', res);
      })
      .catch(err => {
        console.log('ERROR GETting from the DB', err);
      });
  }

  


  render () {
    return (
      <div className='view'>
        <div className="dropdown"> 
          <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span id="selected">Questions</span>
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>Action</li>
            <li>Another action</li>
            <li role="separator" className="divider"></li>
          </ul>
        </div> 

        <Navbar/>
        {/* <WebRTC /> */}
        <Playground saveCodeSnippet={this.saveCodeSnippet} handleRunClick={this.handleRunClick} handleClearClick={this.handleClearClick} editorCode={this.state.editorCode} socket={this.state.socket}/>
        <div className='Terminal' id='terminal'></div>
        <IntervieweeModal/>
        
        

      </div>
    );
  }
}

export default View;