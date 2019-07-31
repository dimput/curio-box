import * as firebase from "firebase";

import { FirebaseConfig } from "../config/key";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("gambar");
export const infoRef = databaseRef.child("infoData");
export const exRef = databaseRef.child("website").child("experience");
export const eduRef = databaseRef.child("website").child("education");