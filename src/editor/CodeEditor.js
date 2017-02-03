import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import 'codemirror/lib/codemirror.css';

const findDOMNode = ReactDOM.findDOMNode;
const className = require('classnames');

class CodeEditor extends React.Component {

    static propTypes = {
        className: PropTypes.any,
        codeMirrorInstance: PropTypes.func,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func,
        onFocusChange: PropTypes.func,
        onScroll: PropTypes.func,
        options: PropTypes.object,
        path: PropTypes.string,
        value: PropTypes.string,
        autoIndent: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        }        
        this.editorListeners = [];
    }
   
    getCodeMirrorInstance() {
        return this.props.codeMirrorInstance || require('codemirror');
    }

    componentDidMount() {
        const textareaNode = findDOMNode(this.refs.textarea);
        const codeMirrorInstance = this.getCodeMirrorInstance();
        this.codeMirror = codeMirrorInstance.fromTextArea(textareaNode, this.createOptions(this.props.options));
        this.codeMirror.on('change', this.codemirrorValueChanged.bind(this));
        this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        this.codeMirror.on('scroll', this.scrollChanged.bind(this));
        var charWidth = this.codeMirror.defaultCharWidth(), basePadding = 4;                
        
        if (this.props.autoIndent === true) {
            this.codeMirror.on("renderLine", (cm, line, elt) => {                    
                var off = codeMirrorInstance.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
                elt.style.textIndent = "-" + off + "px";
                elt.style.paddingLeft = (basePadding + off) + "px";
            });                                   
        }             
        this.forceUpdate();        
    }

    componentDidUpdate(){            
        this.updateEditor();              
    }

    updateEditor() {          
        this.codeMirror.operation(() => {
            let toRemove = [],
                codeUpdated = this.codeMirror && this.props.value != null && this.codeMirror.getValue() !== this.props.value;
            if (codeUpdated) {            
                this.codeMirror.setValue(this.props.value);  
                for (var i=0; i< this.codeMirror.lineCount(); ++i) {                
                    this.codeMirror.indentLine(i);
                }                          
            }
            
            this.editorListeners.forEach(l => {
                if (l.onUpdate(this.codeMirror, codeUpdated) == false) {
                    toRemove.push(l);
                }
            }); 

            toRemove.forEach(tr => {
                let index = this.editorListeners.indexOf(tr);
                if (index >= 0) {
                    this.editorListeners.splice(index,1);
                }
            })  
        })
    }

    addEditorListener(l) {
        this.editorListeners.push(l);
    }

    removeEditorListener(l) {
        let index = this.editorListeners.indexOf(l);
        if (index >= 0) {
            this.editorListeners.splice(index, 1);
        }        
    }

    createOptions(options) {
        return options;
    }

    componentWillUnmount() {
        // is there a lighter-weight way to remove the cm instance?
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }    

    getCodeMirror() {
        return this.codeMirror;
    }

    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }

    focusChanged(focused) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }

    scrollChanged(cm) {
        this.props.onScroll && this.props.onScroll(cm.getScrollInfo());
    }

    codemirrorValueChanged(doc, change) {
        if (this.props.onChange && change.origin !== 'setValue') {
            this.props.onChange(doc.getValue());
        }
    }

    render() {
        const editorClassName = className(
            'ReactCodeMirror',
            this.state.isFocused ? 'ReactCodeMirror--focused' : null,
            this.props.className
        );
        return (
            <div className={editorClassName}>
                <textarea ref="textarea" name={this.props.path}  autoComplete="off"/>
                {this.renderChildren()}
            </div>
        );
    }

    renderChildren() {
        if (this.codeMirror) {
            const {children} = this.props;

            if (!children) return;

            return React.Children.map(children, c => {
                return c && React.cloneElement(c, {
                    codeMirror: this.codeMirror,
                    codeEditor: this                    
                });
            })
        }
    }
}

module.exports = CodeEditor;