import React, {useEffect, useState} from "react";

function App() {
  const[todos, setTodos] = useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos').then((result)=>{
      result.json().then((res)=>{
        console.log(res)
        setTodos(res)
      })
      })
    }, [])
console.log(todos);

  return (
    <div className="App">
        <h1>TODO LIST REACT</h1>
        <hr />
        <div className="container">
        {
          todos.map((todo)=> ( <div key={todo.id}  className="InnerDiv"><div className="num">{todo.id} </div> <div>{todo.title}</div></div> ))}
        </div>
    </div>
  );
}

export default App;
