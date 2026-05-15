import { useMemo, useState } from 'react'
import './App.css'

const starterTasks = [
  { id: 1, title: 'Build landing page', status: 'In Progress', priority: 'High' },
  { id: 2, title: 'Connect REST API', status: 'Todo', priority: 'Medium' },
  { id: 3, title: 'Review mobile UI', status: 'Done', priority: 'Low' },
]

function App() {
  const [tasks, setTasks] = useState(starterTasks)
  const [title, setTitle] = useState('')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => tasks.filter((task) => {
    const matchesText = task.title.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'All' || task.status === status
    return matchesText && matchesStatus
  }), [tasks, query, status])

  function addTask(event) {
    event.preventDefault()
    if (!title.trim()) return
    setTasks([{ id: Date.now(), title, status: 'Todo', priority: 'Medium' }, ...tasks])
    setTitle('')
  }

  function nextStatus(task) {
    const flow = { Todo: 'In Progress', 'In Progress': 'Done', Done: 'Todo' }
    setTasks(tasks.map((item) => item.id === task.id ? { ...item, status: flow[task.status] } : item))
  }

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">React Task Manager</p>
          <h1>CRUD task app untuk demo freelance full-stack.</h1>
        </div>
        <div className="stats">
          <strong>{tasks.length}</strong>
          <span>Total Tasks</span>
        </div>
      </section>

      <section className="toolbar">
        <form onSubmit={addTask}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add new task" />
          <button>Add Task</button>
        </form>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search task" />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>All</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </section>

      <section className="board">
        {filtered.map((task) => (
          <article key={task.id}>
            <div>
              <h2>{task.title}</h2>
              <p>{task.status}</p>
            </div>
            <span className={task.priority.toLowerCase()}>{task.priority}</span>
            <div className="actions">
              <button onClick={() => nextStatus(task)}>Update Status</button>
              <button className="danger" onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App
