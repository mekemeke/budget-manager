import firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAd7MP8meN2LNMS8EXOdqb-7xNU08QiPnM",
  authDomain: "budget-manager-d7d1d.firebaseapp.com",
  databaseURL: "https://budget-manager-d7d1d.firebaseio.com",
  projectId: "budget-manager-d7d1d",
};

firebase.initializeApp(config);

export default firebase.firestore();
