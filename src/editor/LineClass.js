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
        this.addClass = this.addClass.bind(this);
    }

    componentDidMount() {
        //this.renderLinesClass();
        this.props.codeMirror.on("renderLine", this.addClass);
        this.props.codeMirror.refresh();
    }

    componentWillUnmount() {
        this.props.codeMirror.off("renderLine", this.addClass);
        this.props.codeMirror.refresh();
    }

    addClass(cm, line, elt) {
       // debugger;
        let lineNumber = cm.lineInfo(line).line;
        if (this.props.lineNumbers.indexOf(lineNumber) >= 0) {            
            elt.className += ` ${this.props.linesClassName}`;
        }
    }    

    render() {
        return null;
    }
}

LineClass.defaultProps = {
    where: 'wrap'
}

export default LineClass;