import React, {PropTypes} from 'react';

class LineClass extends React.Component {

    static proptTypes = {
        codeMirror: PropTypes.object,
        lineNumbers: PropTypes.arrayOf(PropTypes.number),
        linesClassName: PropTypes.string
    }

    componentDidMount() {
        this.renderLinesClass();
    }

    componentDidUpdate(prevProps) {
        this.clearLinesClass(prevProps);
        this.renderLinesClass();
    }

    componentWillUnmount() {
        this.clearLinesClass();
    }

    clearLinesClass(props) {
        console.error('unmounting LIneClass');
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror.getDoc();
            (props || this.props).lineNumbers.forEach(ln => {
                console.error('remove line class ' + ln);
                doc.removeLineClass(ln, 'wrap', this.props.linesClassName)
            });
        }
    }

    renderLinesClass() {
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror.getDoc();
            this.props.lineNumbers.forEach(ln => {
                console.error('add line class ' + ln);
                doc.addLineClass(ln, 'wrap', this.props.linesClassName)
            });
        }
    }

    render() {
        return null;
    }
}

export default LineClass;