import { todosRef,infoRef } from "../config/firebase";
import { FETCH_TODOS } from "./types";

export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
  // console.log(newToDo.email);
  
  infoRef.once('value',snapshot => {
    var temanku = snapshot.val().jumlah;
    var jumlahku = {};
    jumlahku['jumlah']=parseInt(temanku)+1;
    infoRef.update(jumlahku);
  })

};

export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};