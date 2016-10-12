import React, {PropTypes} from 'react';

class LineClass extends React.Component {

    static proptTypes = {
        codeMirror: PropTypes.object,
        lineNumbers: PropTypes.arrayOf(PropTypes.number),
        linesClassName: PropTypes.string,
        where: PropTypes.string
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
            let doc = this.props.codeMirror.getDoc(),
                workingProps = props || this.props;
            workingProps.lineNumbers.forEach(ln => {
                console.error('remove line class ' + ln);
                doc.removeLineClass(ln, workingProps.where, workingProps.linesClassName)
            });
        }
    }

    renderLinesClass() {
        if (this.props.codeMirror) {
            let doc = this.props.codeMirror.getDoc();
            this.props.lineNumbers.forEach(ln => {
                console.error('add line class ' + ln);
                doc.addLineClass(ln, this.props.where, this.props.linesClassName)
            });
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