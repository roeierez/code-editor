import React, {PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import EditorOperation from './EditorOperation';
let id = 0;
class Marker extends React.Component {

    static propTypes = {
        codeMirror: PropTypes.object,
        lineNumber: PropTypes.number,
        gutterID: PropTypes.string,
        gutterComponent: PropTypes.element
    }

    constructor(props) {
        super(props);        
        this.destroyed = false; 
        this.lastGutterID = null;
        this.lastLineNumber = null;        
        this.gutterNode = null;        
    }

    componentWillMount() {                        
        this.props.codeEditor.addEditorListener(this);
        var div = document.createElement('div');
        div.innerHTML = ReactDOMServer.renderToString(this.props.gutterComponent);
        this.gutterNode = div.firstChild;
    }

    componentWillUnmount() {        
        this.destroyed = true;
    }

    onUpdate(codeMirror, codeUpdated) {         
        if (this.destroyed) {        
            codeMirror.setGutterMarker(this.lastLineNumber, this.lastGutterID, null);        
            return false;    
        } else {            
            if (codeUpdated || this.lastGutterID != this.props.gutterID || this.lastLineNumber != this.props.lineNumber) {
                if (this.lastGutterID != null && this.lastLineNumber != null) {                    
                    codeMirror.setGutterMarker(this.lastLineNumber, this.lastGutterID, null);                                
                }
                
                this.lastGutterID = this.props.gutterID;
                this.lastLineNumber = this.props.lineNumber;                
                codeMirror.setGutterMarker(this.props.lineNumber, this.props.gutterID, this.gutterNode);
            }
        }
    }    

    render() {
        return null;
    }
}

export default Marker;