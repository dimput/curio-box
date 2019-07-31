import firebase from 'firebase/app';
import 'firebase/storage';

const storage = firebase.storage();

export {
    storage, firebase as default
}