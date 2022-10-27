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
    </div>
  );
}

export default App;
