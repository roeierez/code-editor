import React, {Component, PropTypes} from 'react';
import CLikeCodeEditor from '../editor/clike';
import Selections from '../editor/Selections';
import LineClass from '../editor/LineClass';
import Marker from '../editor/Marker';
import 'codemirror/theme/material.css';
import 'codemirror/theme/night.css';
import './editor-styles.css';
import MoveCursor from '../editor/MoveCursor';

class Movie extends Component {


    constructor(props) {
        super(props);
        this.state =
        {operations: [], code: 'int x = 5; \n printf("%i test", 5);'};
    }

    componentDidMount() {
        let steps = [
                {
                    code: 'int x = 5; \n printf("%i test", 5);'
                },
                {
                    code: 'int x = 5; \n printf("%i test", );',
                    operations: [
                        <Marker lineNumber={1} gutterID="breakpoints" gutterComponent={<div style={{color: "#822"}}>●</div>}/>
                    ]
                },
                {
                    code: 'int x = 5; \n printf("%i test",);',
                    operations: [
                        <Marker lineNumber={0} gutterID="breakpoints" gutterComponent={<div style={{color: "#822"}}>●</div>}/>
                    ]
                },
                {
                    code: 'int x = 5; \n printf("%i test);',
                    operations: [
                        <Selections key="1" selectionsArray={[{anchor: {line: 0, ch: 0}, head: {line: 0, ch: 8}}]}/>
                    ]
                },
                {
                    code: 'int x = 5; \n printf("%i tes);',
                    operations: [
                        <Selections key="1" selectionsArray={[{anchor: {line: 0, ch: 0}, head: {line: 0, ch: 8}}]}/>,
                        <MoveCursor line={0} ch={5} />
                    ]
                }
            ],
            i = 0;


        this.interval = setInterval(() => {
            if (i == steps.length) {
                clearInterval(this.interval);
                return;
            }
            this.setState({...steps[i], ...steps[i + 1]}, () => {
                i++;
            })
        }, 100);
    }

    render() {
        let {operations, code} = this.state;
        return (
            <CLikeCodeEditor value={code} options={{
                lineNumbers: true, mode: 'javascript',
                gutters: ["breakpoints"]
            }}
            >
                {operations}
            </CLikeCodeEditor>
        )
    }
}

export default Movie;