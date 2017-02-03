import React, {PropTypes} from 'react';

class LineClass extends React.Component {

    static propTypes = {
        propTypes: PropTypes.object,
        lineNumbers: PropTypes.arrayOf(PropTypes.number),
        linesClassName: PropTypes.string,
        where: PropTypes.string
    }

    constructor(props) {
        super(props);        
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {         
        this.mounted = true;
        this.props.codeEditor.addEditorListener(this);        
    }

    componentWillUnmount() {                
        this.lineClassName = this.props.lineClassName;
        this.lineNumbers = this.props.lineNumbers;
        this.mounted = false;
    }

    onUpdate(codeMirror, codeUpdated) {        
        if (!this.mounted) {            
            this.lineNumbers.forEach(l => {
                codeMirror.removeLineClass(l, "text", this.linesClassName);
            });
            return false;
        } else {
            if (codeUpdated || !this.firstTime) {                
                this.props.lineNumbers.forEach(l => {
                    codeMirror.addLineClass(l, this.props.where, this.props.linesClassName);
                });        
            }
            this.updated = true;
        }
    }    

    render() {
        return null;
    }
}

LineClass.defaultProps = {
    where: 'text'
}

export default LineClass;