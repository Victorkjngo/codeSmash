import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import colorize from '../../../../node_modules/codemirror/addon/runmode/colorize.js';
import activeLine from '../../../../node_modules/codemirror/addon/selection/active-line.js';
import javascript from '../../../../node_modules/codemirror/mode/javascript/javascript.js';

class Playground extends Component {
  constructor (props) {
    super(props);

    this.state = {
      otherClientCursor: undefined
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
      },
      styleActiveLine: {
        nonEmpty: true
      }

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
      this.props.socket.emit('cursor_moved', {line, ch});
    });
    

    this.props.socket.on('changed_code', (code) => {
      if (codeMirror.getValue() !== code) {
        codeMirror.setValue(code);
      }
    });

    this.props.socket.on('cursor_moved', (cursorLoc) => {
      // codeMirror.setCursor(cursorLoc); // set other cursor location
      // console.log('Cursor movement recieved! Moving bookmark...');
      // codeMirror.setBookmark(cursorLoc);
      // console.log('Bookmarks:', codeMirror.getAllMarks());
      // codeMirror.addWidget(cursorLoc);
      console.log('Cursor location at:', JSON.stringify(cursorLoc));
      // var cursor = this.state.otherClientCursor;

      // if (cursor) {
      //   cursor.clear();
      // } 
      var {line, ch} = cursorLoc;
      var widget = document.createElement('span');
      widget.classList.add('otherClient');
      
      
      this.setState((prevState, props) => {
        if (prevState.otherClientCursor) {
          prevState.otherClientCursor.clear();
        }
        var otherCursor = codeMirror.setBookmark(cursorLoc, {
          widget: widget
        });
        return {otherClientCursor: otherCursor};
      });
      
      // this.setState((prevState, props) => {
      //   var otherCursor = codeMirror.markText({line: line, ch: ch + 1}, {line , ch: ch + 1}, {
      //     className: 'otherClient',
      //     atomic: true,
      //     // startStyle: 'otherClient',
      //   });
      //   return {otherClientCursor: otherCursor};
      // });
      
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
