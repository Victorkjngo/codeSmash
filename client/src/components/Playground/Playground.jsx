import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from 'codemirror';
import colorize from '../../../../node_modules/codemirror/addon/runmode/colorize.js';
import activeLine from '../../../../node_modules/codemirror/addon/selection/active-line.js';
import javascript from '../../../../node_modules/codemirror/mode/javascript/javascript.js';
import _ from 'underscore';

class Playground extends Component {
  constructor (props) {
    super(props);

    this.state = {
      theme: 'monokai-sublime'
    };

    this.saveCodeSnippet = props.saveCodeSnippet;
    this.handleRunClick = props.handleRunClick;
    this.handleClearClick = props.handleClearClick;
  }

  componentDidMount () {
    var otherClientCursor, storedCode;
    var textArea = document.getElementById('code');
    var defaultString = this.props.editorCode;
    var options = {
      tabSize: 2,
      indentUnit: 2,
      lineNumbers: true,
      lineWrapping: true,
      theme: this.state.theme,
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

    var widget = document.createElement('span');
    widget.classList.add('otherClient');

    var storedCode = codeMirror.getValue();

    codeMirror.on('keyup', (cm, change) => {
      var code = codeMirror.getValue();
      var { line, ch } = codeMirror.getCursor();
      
      if (storedCode !== code) {
        storedCode = code;
        cm.save();
        this.props.socket.emit('changed_code', {code, cursor: {line, ch}});

      }
      console.log('key up handler complete!');

    });

    codeMirror.on('cursorActivity', _ => {
      // console.log('Own cursor moved...');
      var { line, ch } = codeMirror.getCursor(); // own cursor loc
      this.props.socket.emit('cursor_moved', {line, ch});
    });

    this.props.socket.on('changed_code', (details) => {
      console.log('Recieved code changed event...');
      var { code, cursor } = details;
      var ownCursor = codeMirror.getCursor();
      
      codeMirror.setValue(code);
      codeMirror.setCursor(ownCursor);
      codeMirror.setBookmark(cursor, {
        widget: widget
      });

    });

    this.props.socket.on('cursor_moved', (cursorLoc) => {
      // console.log('Other cursor moved!', 'Loc:', cursorLoc);
      var {line, ch} = cursorLoc;
      var cursor = {line, ch};
      if (JSON.stringify(cursor) !== JSON.stringify(otherClientCursor)) {
        codeMirror.setBookmark(cursorLoc, {
          widget: widget
        });
      }
      
      
    });
    
    this.props.sendMirror(codeMirror);
    
  }

  render () {
    return (
      <div className="playground">
        <textarea id="code"></textarea>
      </div>
    );
  }
}

export default Playground;
