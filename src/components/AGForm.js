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
            bio: '',
            bioPer: 0,
            bBud: '',
            bBudPer: 0,
            final: 0,
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
                qcPer: ((this.state.qc / this.state.unbucked) * 100).toFixed(0),
                bioPer: ((this.state.bio / this.state.qc) * 100).toFixed(0),
                bBudPer: ((this.state.bBud / this.state.qc) * 100).toFixed(0),
                final: ((this.state.qc - this.state.bio - this.state.bBud))
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
            <fieldset>

                <form onSubmit={this.formSubmit}>
                    <table>
                        <caption>
                            AG3 Form Sheet 4.2.0
                        </caption>

                        <tbody>
                        <tr>
                            <td>
                                <select
                                    onChange={this.radioClick}
                                    className="AGFormField">
                                    <option
                                        name="strain" value={this.state.strain}>
                                        Select strain:
                                    </option>
                                    <option name="strain" value="SSC">
                                        Sour Space
                                    </option>
                                    <option name="strain" value="SS">
                                        Special Sauce
                                    </option>
                                </select>
                            </td>
                            <td className={this.state.strain ? 'row' : 'row hidden'}>
                                <label>
                                    Unbucked total:
                                </label>
                                <input type="number" name="unbucked" value={this.state.unbucked}
                                       className="AGFormField"
                                       onChange={this.fieldChange}/>
                            </td>
                        </tr>


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

                        <tr className={this.state.qc ? 'row' : 'row hidden'}>
                            <td>
                                <label>
                                    Biomass
                                </label>
                                <input type="number" name="bio" value={this.state.bio} className="AGFormField"
                                       onChange={this.fieldChange}/>
                            </td>
                            <td>
                                <div>
                                    <label>
                                        % of QC total:
                                    </label>
                                    <textarea name="bioPer" className="AGFormField Per" readOnly={true}
                                              value={this.state.bioPer}/>
                                </div>
                            </td>
                        </tr>

                        <tr className={this.state.bio ? 'row' : 'row hidden'}>
                            <td>
                                <label>
                                    B-buds
                                </label>
                                <input type="number" name="bBud" value={this.state.bBud} className="AGFormField"
                                       onChange={this.fieldChange}/>
                            </td>
                            <td>
                                <div>
                                    <label>
                                        % of QC total:
                                    </label>
                                    <textarea name="bBudPer" className="AGFormField Per" unselectable={true}
                                              value={this.state.bBudPer}/>
                                </div>
                            </td>
                        </tr>

                        <tr className={this.state.bBud ? 'row' : 'row hidden'}>
                            <td/>

                            <td>
                                <div className="blinker">
                                    <label>
                                        Final total:
                                    </label>
                                    <textarea name="final" className="AGFormField Per Final" unselectable={true}
                                              readOnly={true}
                                              value={this.state.final}/>
                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td colSpan={2}>
                                <input type="submit" value={this.state.submitMessage} onClick={this.formSubmit}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </fieldset>
        );
    } //render
    // this.state.unbucked / this.state.bucked

    // formSubmit(event) {
//     alert('A name was submitted: ' + this.state.value);
//     event.preventDefault();
// }
}
