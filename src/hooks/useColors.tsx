// let darkMode = false;

import React, { useContext } from "react"
import { Context } from "../Context/DataContext";
import PropTypes from 'prop-types';


interface Props {
    primary: string,
    secondry: string,
    button: string,
    btnText: string,
    black: string,
    heading: string,
    white: string,
    background: string,
    bottomBar: string,
    bottomActiveIcons: string,
    bottomInActiveIcons: string,
    plusBtmIcon: string,
    statusBar: string,

}

const useColors = (props: any) => {

    const { state } = useContext(Context);

    const colorsDark = {
        primary: "#E2B378",
        secondry: "#111111",
        button: "#E2B378",
        btnText: "#111111",
        black: "#111111",
        heading: "white",
        white: "white",
        background: "#111111",
        bottomBar: '#1D1D1D',
        bottomActiveIcons: '#E2B378',
        bottomInActiveIcons: 'rgba(255, 255, 255, 0.5)',
        plusBtmIcon: 'rgba(255, 255, 255, 0.5)',
        statusBar: '#111111',
        profileTabs: '#1d1d1d',
        profileTabsIcons: "white",
        // SWITCH COLORS
        switchThumbOn: "#E2B378",
        switchThumbOf: "grey",
        switchTrackOn: "grey",
        switchTrackOf: "white",
        textInputBorder: "rgba(255,255,255,0.4)",
        placeHolder: 'rgba(255,255,255,0.4)'
    }

    const colorsLight = {
        primary: "#264D68",
        secondry: "#E2B378",
        button: "#264D68",
        black: "white",
        heading: "#264D68",
        white: "#111111",
        btnText: "#fff",
        background: "#fff",
        bottomBar: '#264D68',
        bottomActiveIcons: "#fff",
        bottomInActiveIcons: 'rgba(255, 255, 255, 0.4)',
        plusBtmIcon: '#fff',
        statusBar: '#fff',
        profileTabs: '#264D68',
        profileTabsIcons: "white",
        // SWITCH COLORS
        switchThumbOn: "#E2B378",
        switchThumbOf: "grey",
        switchTrackOn: "grey",
        switchTrackOf: "white",
        textInputBorder: "rgba(0,0,0,0.5)",
        placeHolder: 'rgba(0,0,0,0.5)"',

    }

    if (state.theme == 'dark') return colorsDark[props] ?? '#111'
    else return colorsLight[props] ?? '#111'
}



export default useColors;
