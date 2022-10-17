import React , {useState , useEffect} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
function App ()
{
  const[assignee,setAssignee] = useState("")
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(()=> {
      if(localStorage.getItem("Tasks"))
      {
          const storedTodos = JSON.parse(localStorage.getItem("Tasks"));
          setTodos(storedTodos);
      }
  },[])
  const addTodo = () => //add new task + assignee ---> To-do
  {
      const newTodo ={
        id: Math.random() , 
        task : task,
        assignee:assignee , 
        done:false
      };
      setTodos([...todos, newTodo]);
      localStorage.setItem("Tasks", JSON.stringify([...todos, newTodo]));
      setTask("");
      setAssignee("");
  };
  const deleteTodo = id =>     //delete task /assignee 
  {
    let result = window.confirm("Are you sure to delete?");
    if(result)
    {
      const deletee = todos.filter((todo)=>todo.id !== id);
      setTodos(deletee);
      localStorage.setItem("Tasks", JSON.stringify(deletee));
    }
  };
  const Clear=()=>{        // clear all the item in todo list
    setTodos([]);
    localStorage.removeItem("Tasks");
  }  
  const doneTodo = (e,id,done)=> { //done 
    if (done === true)
    {
      e.target.classList.remove('completeB');
      ReactDOM.findDOMNode(e.target).parentNode.classList.remove("completeA");
      let notdone =todos.map(obj =>{if (obj.id === id ) {return {...obj, done: false};}return obj;});
      setTodos(notdone);
      localStorage.setItem("Tasks", JSON.stringify(notdone))
    } 
    else
    {
      e.target.classList.add('completeB');
      ReactDOM.findDOMNode(e.target).parentNode.classList.add("completeA");
      let donee =todos.map(obj =>{if (obj.id === id ) {return {...obj, done: true};}return obj;});
      setTodos(donee);
      localStorage.setItem("Tasks", JSON.stringify(donee));
    }
  };
  //search 
  const [search, setSearch] = useState("");
  const filteredTasks = todos.filter(
      ({ task, assignee }) =>
        task.toLowerCase().includes(search.toLowerCase()) ||
        assignee.toLowerCase().includes(search.toLowerCase())
  );
  let printTodo = filteredTasks.map((todo) => {
    return(
    <div className={todo.done === true ? "completeA" : "my-tasks"} key ={todo.id} >
      <p>Task Name: {todo.task}</p>
      <button className={todo.done === true ? "completeB" : "done" } onClick={(e) => doneTodo(e,todo.id,todo.done)}>Done </button>
      <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
      <p>Assignee: {todo.assignee}</p>
    </div> )
  });
  return(
    <div>
      <form id="form">
        <label htmlFor="taskname">Task Name: 
        <input  required name="taskname" id="taskname" value={task} onChange={(e)=>(setTask(e.target.value))} type="text" placeholder="task name" />
        </label>
        <label htmlFor="assignee">Assignee : 
        <input  required name="assignee" id="assignee" value= {assignee} onChange={(e)=>(setAssignee(e.target.value))} type="text" placeholder="assignee" />
        <button className="b_add" onClick={addTodo} >Add Task</button>
        </label>
      </form>
      <hr/>
      <div className="search">
        <input type="text" value={search} id="search" placeholder=" Search" onChange={(e) => setSearch(e.target.value)} />
        {printTodo}
      </div>
      <footer className="counts" id="counts">
        <p id="TD_count">To-Do:{todos.length}</p>
        <p id="D_count">Done:{todos.filter(value => value.done === true).length}</p>
        <button className="clear" onClick={()=>Clear()} >Clear </button>
      </footer>
    </div> 
  );}
export default App;