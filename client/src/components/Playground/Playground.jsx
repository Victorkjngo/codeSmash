import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import colorize from '../../../../node_modules/codemirror/addon/runmode/colorize.js';
import javascript from '../../../../node_modules/codemirror/mode/javascript/javascript.js';

class Playground extends Component {
  constructor (props) {
    super(props);

    this.state = {
      cursorLoc: undefined
    };

    this.saveCodeSnippet = props.saveCodeSnippet;
    this.handleRunClick = props.handleRunClick;
    this.handleClearClick = props.handleClearClick;
  }

  componentDidMount () {
    var textArea = document.getElementById('code');
    var defaultString = this.props.editorCode;
    var options = {
      tabSize: 2,
      indentUnit: 2,
      lineNumbers: true,
      lineWrapping: true,
      theme: 'monokai-sublime',
      autofocus: true,
      mode: {
        name: 'javascript',
        json: true
      }
      // viewportMargin: Infinity
    };
    textArea.value = defaultString;
    var codeMirror = CodeMirror.fromTextArea(textArea, options);
    codeMirror.setSize('100%', '100%');
    codeMirror.execCommand('goDocEnd');
    codeMirror.on('change', (cm, change) => {
      cm.save();
      var code = codeMirror.getValue();
      this.props.socket.emit('changed_code', code);
    });

    var { line, ch } = codeMirror.getCursor();
    this.setState({cursorLoc: {line, ch}});

    codeMirror.on('cursorActivity', _ => {
      var { line, ch } = codeMirror.getCursor();
      if (JSON.stringify({line, ch}) !== JSON.stringify(this.state.cursorLoc)) {
        this.setState({cursorLoc: {line, ch}}, _ => {
          console.log('Cursor moved!', 'New cursor loc:', JSON.stringify({line, ch}));
          this.props.socket.emit('cursor_moved', {line, ch});
        });
      }
    });
    

    this.props.socket.on('changed_code', (code) => {
      if (codeMirror.getValue() !== code) {
        codeMirror.setValue(code);
      }
    });

    this.props.socket.on('cursor_moved', (cursorLoc) => {
      codeMirror.setCursor(cursorLoc);
    });
    
  }

  emitClearEvent () {
    console.log('Emitting clear event!');
    this.props.socket.emit('cleared_terminal');
  }

  render () {
   
    return (
      <div className="playground">
        <div className="buttons">
          <button onClick={ _ => {
            this.handleRunClick();
          }} 
          className="run"
          >
          Run
          </button>  
          <button onClick={ _ => {
            this.handleClearClick();
            this.emitClearEvent();  
          }}
          className="run"
          >Clear
          </button>  

          <button onClick={ _ => {
            this.saveCodeSnippet();
          }}
          className="run"
          >Save 
          </button>
        </div>
        <textarea id="code"></textarea>
      </div>
    );
  }
}

export default Playground;
