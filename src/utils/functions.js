// importing local storage
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { Share } from 'react-native';
import { urls } from './Api_urls';
import { navigate } from '../../Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';


export const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];
export const weekDays = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
]

export const getDayName = (dateObj) => {
  const date = new Date(dateObj);
  const options = { weekday: 'long' };
  const dayName = date.toLocaleDateString('en-US', options).split(',')[0];
  return dayName;
}

// local storage function that retreives the data
export async function retrieveItem(key) {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {
    console.log(error.message);
  }
  return
}


// store data in lcoalstorage
async function storeItem(key, item) {
  try {
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}



//validing email
function validateEmail(text) {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {

    return false;
  }
  else {
    return true;
  }
}


// simple console log, so I can turn it off later
function doConsole(d) {
  console.log(d)
}


// simple alert
function doAlertPlease(a, b, c) {

  // let shown = true

  // return (
  //     <>
  //     {shown && <SimpleAlert
  //         Confirm={()=>{ shown = false}}
  //         title={b ?? "Alert"}
  //         text={c ?? "Error"}
  //         btn2="Okay"
  //     />}
  //     </>
  // )

  alert(c)



}


function timeZoneTry(timeNow) {
  var tzo = -timeNow.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
  return dif + pad(tzo / 60) + ':' + pad(tzo % 60);
}

const onShare = async (msg) => {
  try {
    const result = await Share.share({
      message: msg
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
  }
};



function getParamFromURL(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === "undefined") {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === "string") {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

export function formatDate(dateObj) {
  var month = dateObj.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
    if (dateObj.getDate() < 10) {
      const dat = "0" + dateObj.getDate();
      let date = dateObj.getFullYear() + "-" + month + "-" + dat;
      return date
    }
    else {
      let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate();
      return date
    }
  }
  else {
    if (dateObj.getDate() < 10) {
      const dat = "0" + dateObj.getDate()
      let date = dateObj.getFullYear() + "-" + month + "-" + dat
      return date
    }
    else {
      let date = dateObj.getFullYear() + "-" + month + "-" + dateObj.getDate()
      return date
    }

  }
}

export function jsDateObjToStandard(v) {
  if (v) {
    const dateObj = new Date(v);
    const year = dateObj.getUTCFullYear();
    const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getUTCDate()).slice(-2);
    const hours = ('0' + dateObj.getUTCHours()).slice(-2);
    const minutes = ('0' + dateObj.getUTCMinutes()).slice(-2);
    const seconds = ('0' + dateObj.getUTCSeconds()).slice(-2);
    const standardDateTime = `${hours}:${minutes}, ${day}-${month}-${year}`;
    return standardDateTime
  }
}

function generateRandomKey(uri) {
  let shortUrl = uri.substring(uri.length - 4, uri.length - 10);
  const randomNum = Math.floor(Math.random() * Math.pow(10, 15));
  const keyString = randomNum.toString().padStart(15, '0') + shortUrl;
  return keyString;
}


export async function uploadSingleFile() {
  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    })
    let res = result.assets[0];
    console.log('res===', res)
    let type = res?.type?.split('/');
    const photo = {
      uri: res?.uri,
      type: res?.type,
      name: generateRandomKey(res?.uri) + "." + type[1]
      // name: generateRandomKey+type[1]},
    };

    return photo;
    // setGallaryUploadedImgs(results)
  } catch (err) {
    return {
      errror: "Unknown Error: " + JSON.stringify(err)


    }
  }
}



// common Navigations

module.exports.storeItem = storeItem;
module.exports.doConsole = doConsole;
module.exports.validateEmail = validateEmail;
module.exports.doAlertPlease = doAlertPlease;
module.exports.timeZoneTry = timeZoneTry;
module.exports.onShare = onShare;
module.exports.getParamFromURL = getParamFromURL;


