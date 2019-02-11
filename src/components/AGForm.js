import React, {Component} from 'react';

export default class AGForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unbucked: '',
            bucked: '',
            buckedPer: 0,
            // buckedPer: this.state.bucked / this.state.unbucked,
            qc: '',
            qcPer: 0
            // qcPer: this.state.qc / this.state.unbucked
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        // const value = target.type === 'checkbox' ? target.checked : target.value;

        // const buckedPer = (this.state.bucked / this.state.unbucked) * 100;
        // if (buckedPer) {
        //     this.setState({buckedPer: buckedPer})
        // } else {
        //     this.setState({buckedPer: 0})
        // }

        this.setState({
            [name]: value,
            // buckedPer: (this.state.bucked / this.state.unbucked) * 100,
            // qcPer: (this.state.qc / this.state.unbucked) * 100,
        }, () => {
            this.setState({
                buckedPer: (this.state.bucked / this.state.unbucked) * 100,
                qcPer: (this.state.qc / this.state.unbucked) * 100
            })

            // console.log('unbucked: ', this.state.unbucked, '\nbucked: ', this.state.bucked, '\nbuckedPer: ', this.state.buckedPer, '\nqc: ', this.state.qc, '\nqcPer: ', this.state.qcPer)
            // });
            // console.log(event.target.values);
            // this.setState({values: event.target.value});
        });
    };

    handleSubmit(event) {
        console.log(event.target.toString());
        event.preventDefault();
    };

// onChange={this.handleChange}
    render() {

        console.log('unbucked: ', this.state.unbucked, '\nbucked: ', this.state.bucked, '\nbuckedPer: ', this.state.buckedPer, '\nqc: ', this.state.qc, '\nqcPer: ', this.state.qcPer)

        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <caption>Fill the fields, bub!</caption>
                    <thead>
                    <tr>
                        <th>
                            <title>
                                AG3 Form Sheet 4.2.0
                            </title>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td/>
                        <td>
                            <label>
                                Unbucked total:
                            </label>
                            <input type="number" name="unbucked" value={this.state.unbucked}
                                   onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                Bucked total:
                            </label>
                            <input type="number" name="bucked" value={this.state.bucked} onChange={this.handleChange}/>
                        </td>
                        <td>
                            <label>
                                % of total:
                            </label>
                            <textarea name="buckedPer" readOnly={true}
                                      value={this.state.buckedPer}/>

                            {/*<textarea datatype={this.state.buckedPer} value={(this.state.bucked / this.state.unbucked) * 100}/>*/}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>
                                Ready for QC:
                            </label>
                            <input type="number" name="qc" value={this.state.qc} onChange={this.handleChange}/>
                        </td>
                        <td>
                            <label>
                                % of total:
                            </label>
                            <textarea name="qcPer" readOnly={true} value={this.state.qcPer}/>
                        </td>


                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value="Submit"/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

        );
    } //render
// this.state.unbucked / this.state.bucked

// handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
// }
}