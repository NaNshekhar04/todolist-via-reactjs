import React, {useEffect, useState} from "react";

function App() {
  const[todos, setTodos] = useState([])
  const[title, setTitle] = useState('');
  const[completed, setCompleted] = useState(false);


  useEffect(()=>{
    getTodos()
    }, [])

    function getTodos(){
      fetch('https://jsonplaceholder.typicode.com/todos').then((result)=>{
      result.json().then((res)=>{
        console.log(res)
        setTodos(res)
        setTitle(res[0].title)
        setCompleted(res[0].completed)

      })
      })
    }

    //ADDING A TODO

    const addTodo = ()=>{
      console.log({title, completed, });
      let index = todos.length;
      const data = {title, completed, id:index+1,userId:1}
      fetch('https://jsonplaceholder.typicode.com/todos',{
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body:  JSON.stringify(data)
      }).then(()=>{
        setTodos([...todos, data ])
      })
    }

   // DELETING A TODO

   const onDelete =  (id) => {
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

  return (
    <div className="App">
        <h1>TODO LIST REACT</h1>
        <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} name="name" /> 
        <input type="text" value={completed} onChange={(e) => {setCompleted(e.target.value)}} name="completed" /> 
        <button type="button" className="btn" onClick={addTodo}>Add</button>
        <hr />
        <div className="container">
        {
          todos.map((todo)=> {
           return <div key={todo.id-1}  className="InnerDiv">
            <div className="title">{todo.title}</div> 
            <div className="status"> Status= <input type="checkbox" checked={todo.completed} defaultChecked={todo.completed} />
            <button onClick={()=>onDelete(todo.id)}>Delete</button>
            </div> 
            <div> 
              </div>
             </div> 
          })}
        </div>
    </div>
  );
}

export default App;
