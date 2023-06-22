import {atom} from "recoil";


const loggedIn =atom({
    key:"loginStatus",
    default:false
  });

  export {loggedIn};