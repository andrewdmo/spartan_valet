import React, {Component} from 'react';

export default class AGForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

            strain: '',
            unbucked: '',
            bucked: '',
            buckedPer: 0,
            // buckedPer: this.state.bucked / this.state.unbucked,
            qc: '',
            qcPer: 0,
            submitForm: false,
            submitMessage: 'Save?'
            // qcPer: this.state.qc / this.state.unbucked
        };

        // this.fieldClick = this.fieldClick.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.radioClick = this.radioClick.bind(this);
    }


    fieldChange = (event) => {

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
                buckedPer: ((this.state.bucked / this.state.unbucked) * 100).toFixed(0),
                qcPer: ((this.state.qc / this.state.unbucked) * 100).toFixed(0)
            })

            // console.log('unbucked: ', this.state.unbucked, '\nbucked: ', this.state.bucked, '\nbuckedPer: ', this.state.buckedPer, '\nqc: ', this.state.qc, '\nqcPer: ', this.state.qcPer)
            // });
            // console.log(event.target.values);
            // this.setState({values: event.target.value});
        });
    };

    radioClick = (event) => {
        this.setState({
            strain: event.target.value
        })
    };


    formSubmit(event) {
        console.log(event.target);
        event.preventDefault();

        if (this.state.submitForm !== false) {
            this.setState({
                // submitForm: true,
                submitMessage: 'NOT SAVED!!'
            })
        } else {
            this.setState({
                submitForm: !this.state.submitForm,
                submitMessage: 'Saved?!!'
            })
        }
    };

    // fieldClick = (e) => {
    //     if (e.name !== "bucked") {
    //         this.setState({
    //             qc: {
    //                 hidden: false
    //             }xxxxxxxxx
    //         }); //bucked if
    //     } else if (e.name !== "qc") {
    //         this.setState({
    //             bucked: {
    //                 hidden: false
    //             }
    //         });
    //     }
    // };

    render() {

        console.log(
            'strain: ', this.state.strain,
            '\nunbucked: ', this.state.unbucked,
            '\nbucked: ', this.state.bucked,
            '\nbuckedPer: ', this.state.buckedPer,
            '\nqc: ', this.state.qc,
            '\nqcPer: ', this.state.qcPer,
            '\nsubmitForm: ', this.state.formSubmit);


        // const hidden = true;
        return (
            <form onSubmit={this.formSubmit}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <title>
                                AG3 Form Sheet 4.2.0
                            </title>
                        </th>
                    </tr>
                    </thead>
                    <caption>Fill the fields, bub!</caption>


                    <tbody>

                    <tr>
                        <td>
                            <fieldset>

                                <select
                                    onChange={this.radioClick}>
                                    <option
                                        name="strain" value={this.state.strain}>
                                        Select strain:
                                    </option>
                                    <option name="strain" value='SSC'>
                                        Sour Space
                                    </option>
                                    <option name="strain" value="SS"
                                            className="AGRadio"
                                    >
                                        Special Sauce
                                    </option>
                                </select>
                            </fieldset>
                        </td>
                        <td>
                            <label>
                                Unbucked total:
                            </label>
                            <input type="number" name="unbucked" value={this.state.unbucked}
                                   className="AGFormField"
                                   onChange={this.fieldChange}/>
                        </td>
                    </tr>


                    {/*<div className={hidden ? 'hidden' : ''}>*/}
                    {/*This will be hidden if you set <tt>props.shouldHide</tt>*/}
                    {/*to something truthy.*/}
                    {/*</div>*/}

                    <tr className={this.state.unbucked ? 'row' : 'row hidden'}>
                        <td>
                            <label>
                                Bucked total:
                            </label>
                            <input type="number" name="bucked" value={this.state.bucked}
                                   className="AGFormField"
                                   onChange={this.fieldChange}/>
                        </td>
                        <td>
                            <label>
                                % of total:
                            </label>
                            <textarea name="buckedPer" readOnly={true}
                                      className="AGFormField Per" value={this.state.buckedPer}/>

                        </td>
                    </tr>


                    <tr className={this.state.bucked ? 'row' : 'row hidden'}>
                        <td>
                            <label>
                                Ready for QC:
                            </label>
                            <input type="number" name="qc" value={this.state.qc} className="AGFormField"
                                   onChange={this.fieldChange}/>
                        </td>
                        <td>
                            <div>
                                <label>
                                    % of total:
                                </label>
                                <textarea name="qcPer" className="AGFormField Per" readOnly={true}
                                          value={this.state.qcPer}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="submit" value={this.state.submitMessage} onClick={this.formSubmit}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

        );
    } //render
    // this.state.unbucked / this.state.bucked

    // formSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
// }
}
