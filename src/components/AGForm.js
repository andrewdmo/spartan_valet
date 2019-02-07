import React, {Component} from 'react';

export default class AGForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                unbucked: 1,
                bucked: 0,
                buckedPer: 0,
                qc: 0,
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({values: event.target.value});
    }

    handleSubmit(event) {
        this.setState({values: [event.target.value]}
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
                    <caption>Fill the fields, bub!</caption>
                    <th>
                        <title>
                            AG3 Form Sheet 4.2.0
                        </title>
                    </th>
                    <tbody>
                    <tr>
                        <td/>
                        <td>
                            <label>
                                Unbucked total:
                            </label>
                            <input type="number" defaultValue='0'
                                   value={this.state.values.unbucked} onChange={this.handleChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                Bucked total:
                            </label>
                            <input type="number" defaultValue={this.state.values.bucked}
                                   value={this.state.values.bucked} onChange={this.handleChange}/>
                        </td>
                        <td>
                            <label>
                                % of total:
                            </label>
                            <data value={(this.state.values.bucked / this.state.values.unbucked)}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>
                                Ready for QC:
                            </label>
                            <data value={this.state.values.qc} onChange={this.handleChange}/>
                        </td>
                        <td>
                            <label>
                                % of total:
                            </label>
                            <data value={this.state.values.qc / this.state.values.unbucked}
                                  onChange={this.handleChange}/>
                        </td>


                    </tr>
                    <tr>
                        <input type="submit" value="Submit"/>
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