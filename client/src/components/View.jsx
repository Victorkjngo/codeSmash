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
      codeMirror: undefined,
      terminal: undefined,
      socket: socket,
      editorCode: `function myScript() {\n\tconsole.log('Returning 100');\n\treturn 100;\n}\nconsole.log(myScript());\n`,
      interviewee: null
    };

    xTerm.loadAddon('fit');
    this.emitClearEvent = this.emitClearEvent.bind(this);
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.injectQuestion = this.injectQuestion.bind(this);
    this.saveCodeSnippet = this.saveCodeSnippet.bind(this);
    this.sendMirror = this.sendMirror.bind(this);
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

    

  }

  handleClearClick () {
    this.state.terminal.clear();
  }

  emitClearEvent () {
    this.state.socket.emit('cleared_terminal');
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

  injectQuestion (question) {
    console.log('Injecting this question:', question);
    this.state.codeMirror.setValue(question);
    this.state.codeMirror.execCommand('goDocEnd');
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

  sendMirror (codeMirror) {
    this.setState({codeMirror: codeMirror}, _ => {
      console.log('Sending the mirror!!!');
      console.log('Expecting codeMirror:', this.state.codeMirror);
    });
  }
  


  render () {
    return (
      <div className='view'>

        <Navbar/>
        {/* <WebRTC /> */}
        <Playground editorCode={this.state.editorCode} sendMirror={this.sendMirror} socket={this.state.socket}/>
        <div className='Terminal' id='terminal'></div>
        <PlaygroundFooter editorCode={this.state.editorCode} emitClearEvent={this.emitClearEvent} handleRunClick={this.handleRunClick} handleClearClick={this.handleClearClick} injectQuestion={this.injectQuestion} saveCodeSnippet={this.saveCodeSnippet} />
      
      </div>
    );
  }
}

export default View;