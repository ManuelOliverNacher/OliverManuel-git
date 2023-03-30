import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";




//Configuracion de firebase------------------------------------------------------




const firebaseConfig = {
  apiKey: "AIzaSyC0lEeptOp6_WbNxb9421ewV1oypwlNbPU",
  authDomain: "olivernachermanuel-proyecto.firebaseapp.com",
  projectId: "olivernachermanuel-proyecto",
  storageBucket: "olivernachermanuel-proyecto.appspot.com",
  messagingSenderId: "721612872490",
  appId: "1:721612872490:web:de05500ee31ae065e21c53",
  measurementId: "G-CTY1J091SS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//Configuracion de firebase------------------------------------------------------