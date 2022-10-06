import Header from './components/header';
import { useState,useEffect } from 'react';
import Tasks from './components/Tasks';
import Clock from './components/Clock';
import AddTask from './components/AddTask';


const App = () => {
  const [tasks, setTasks]=useState([])

  useEffect(() => {
    const getTasks= async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

 const fetchTasks= async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

const fetchTask= async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }

//Clock
const [clock,setClock]=useState();
useEffect(()=>{
  let interval=null;
  interval = setInterval(() => {
        setClock((clock)=>showTime());
      }, 1000);
      return ()=>interval;
},[clock])

const showTime=()=>{
  let t=new Date();
  let time=t.toLocaleTimeString();
  return time
}

 
const [showAddTask,setShowAddTask] = useState(false);

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE',
  })
 setTasks(tasks.filter((task)=>(task.id!==id)))
}

//Toggle Remainder
const toggleRemainder =async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle,
  remainder: !taskToToggle.remainder }

  const res= await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id
  ? { ...task, remainder: data.remainder } : task
  ))
}

//AddTask
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })
   
  const data = await res.json()
  setTasks([...tasks, data])

  //const id= Math.floor(Math.random() * 10000)
  //const newTask = { id, ...task}
  //setTasks([...tasks, newTask])
}

  return (
    <>
    
    <Clock clock={clock}/>
   <div className="container">
      
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      onShow={showAddTask}/>

      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length?<Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleRemainder}/>
      :('No Tasks To Show')}
      
      
     </div>
     
     </>
  );
}

export default App;
