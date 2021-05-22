import React, { useState, useEffect } from "react";
import "./App.css";
//Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterdTodos, setFilterdTodos] = useState([]);

//Run once when the app start
  useEffect (() =>{
    getLocalTodos();
  },[]) // Empty list for once

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]); // Runs when there is an update

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterdTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilterdTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilterdTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () =>{
        localStorage.setItem('todos',JSON.stringify(todos));
    };

  const getLocalTodos = () =>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos',JSON.stringify([]));
    }else{
        let todoFromLocal = JSON.parse(localStorage.getItem('todos'))
        setTodos(todoFromLocal)
      }
  }
  
  return (
    <div className="App">
      <header>
        <h1>Chen's Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filterdTodos}
      />
    </div>
  );
}

export default App;
