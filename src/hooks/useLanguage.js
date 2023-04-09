// let darkMode = false;

import React, { useContext, useEffect } from "react"
import { Context } from "../Context/DataContext"
import { translation } from "../Languages/translation";
// import { urdu } from "../Languages/urdu";

const useLanguage = (word) => {

    const { state } = useContext(Context);
    const language = state.userLanguage;

    if (language == 'en') return translation[word]?.en ?? '#'
    else if (language == 'urdu') return translation[word]?.ur ?? '#'
    else return en[word]?.en ?? '#'
}


export default useLanguage;