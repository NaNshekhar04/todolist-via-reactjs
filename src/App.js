import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";

function App() {

  // Creating Multiple useState Hook !

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState(1);

  // Creating useEffect Hook to Fetch

  useEffect(() => {
    getTodos()
  }, [])


  // Fetching Up Todos from API 

  function getTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos').then((result) => {
      result.json().then((res) => {
        console.log(res)
        setTodos(res)
        setTitle(res[0].title)
        setCompleted(res[0].completed)
        setUserId(res[0].id)

      })
    })
  }

  //ADDING A TODO FUNCTION !

  const addTodo = () => {
    console.log({ title, completed, userId });
    let index = todos.length;
    const data = { title, completed, id: index + 1, userId: 1 }
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      setTodos([...todos, data])
    })
  }

  // DELETING A TODO FUNCTION !

  const onDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status !== 200) {
          return
        } else {
          setTodos(todos.filter((todo) => {
            return todo.id !== id;
          }))
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // ONUPDATE FUNCTIONALITY !

  function onUpdate(id) {
    let item = todos[id - 1];
    setTitle(item.title)
    setCompleted(item.completed)
    setUserId(item.id)
  }

  // UPDATING A TODO FUNCTION !

  const updateTodo = () => {
    let item = { title, completed, userId }
    fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        const ans = todos.filter((item) => item.id == userId)
        ans[0].title = title
        ans[0].completed = completed
        setTodos([...todos, ans])
      })
    })
  }



  return (
    <div className="App">

      {/* Navbar Component  */}

      <Navbar />

      {/* Adding Todo Form  */}

      <h1 className="addHeading">ENTER YOUR TODO !</h1>
      <div className="addContainer">
        <input className="addInput" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} name="name" /> <br />
        <input className="addInput" type="text" value={completed} onChange={(e) => { setCompleted(e.target.value) }} name="completed" /> <br />
        <button className="addButton" onClick={addTodo}>Add</button>
      </div>

      {/* Updating a Todo Form  */}

      <div className="updateBox">
        <h1 className="heading">UPDATE A TODO</h1>
        <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <input className="input" type="text" value={completed} onChange={(e) => setCompleted(e.target.value)} /><br />
        <button className="updateTodo" onClick={updateTodo}>Update a Todo</button>
      </div>


      {/* Mapping Over Todos and displaying them into Lists  */}

      <div className="container">
        {
          todos.map((todo) => {

            return (
              <div>
                <ul class="list-group">
                  <li class="list-group-item list-group-item-dark list-group-item-action w-75 p-3 h-25 d-inline-block">
                    <div className="eachTodo">
                      <div className="title" key={todo.id - 1}>
                        {todo.title}
                      </div>
                      <div className="status">
                        Status:- <input class="form-check-input me-1" type='checkbox' checked={todo.completed} defaultChecked={todo.completed} />
                      </div>
                      <div className="btns">
                        <button className="delete" onClick={() => onDelete(todo.id)}>Delete</button>
                        <button className="update" onClick={() => onUpdate(todo.id)}>Update</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )
          })}
      </div>
    </div>
  );
}

export default App;