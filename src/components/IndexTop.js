import React from 'react';
import Logo from "./Logo";
import spartanAptBckgrdSm from '../assets/spartanAptBckgrdSm.jpg'

export default class IndexTop extends React.Component {


    render() {
        return (

            <div className="top">
                <img src={spartanAptBckgrdSm} alt={'mtnApt'} className="backPic"/>
                <Logo/>
                <h1 className="topTitle">Spartan Trash Valet</h1>
            </div>

        )
            ;
    }
}