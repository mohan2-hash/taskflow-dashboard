import { useEffect, useMemo, useState } from 'react'
import { Bell, CheckCircle2, ChevronDown, CirclePlus, LayoutDashboard, ListTodo, Search, Settings, Sparkles, X } from 'lucide-react'
import { initialTasks } from './data'
import { completeTask as completeTaskInList, filterTasks } from './task-utils'
import type { Priority, Status, Task } from './types'

const statuses: Status[] = ['Backlog', 'In progress', 'Done']
const priorities: Priority[] = ['High', 'Medium', 'Low']

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow-tasks')
    return saved ? JSON.parse(saved) as Task[] : initialTasks
  })
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'All' | Status>('All')
  const [dark, setDark] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => localStorage.setItem('taskflow-tasks', JSON.stringify(tasks)), [tasks])
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const visibleTasks = useMemo(() => filterTasks(tasks, query, filter), [tasks, filter, query])

  const completeTask = (id: string) => setTasks(current => completeTaskInList(current, id))
  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks(current => [{ ...task, id: crypto.randomUUID() }, ...current])
    setModalOpen(false)
  }
  const done = tasks.filter(task => task.status === 'Done').length
  const inProgress = tasks.filter(task => task.status === 'In progress').length

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Sparkles size={19} /></div><span>TaskFlow</span></div>
      <nav>
        <a className="nav-item active" href="#dashboard"><LayoutDashboard size={19} />Overview</a>
        <a className="nav-item" href="#tasks"><ListTodo size={19} />My tasks <span className="count">{tasks.length}</span></a>
        <a className="nav-item" href="#settings"><Settings size={19} />Settings</a>
      </nav>
      <div className="sidebar-card"><div className="tiny-label">THIS WEEK</div><strong>{done}/{tasks.length} tasks completed</strong><div className="progress"><span style={{ width: `${tasks.length ? (done / tasks.length) * 100 : 0}%` }} /></div><p>Keep your momentum going.</p></div>
      <div className="profile"><div className="avatar">MV</div><div><strong>Mohan Vegi</strong><small>Personal workspace</small></div><ChevronDown size={16} /></div>
    </aside>
    <section className="workspace" id="dashboard">
      <header><div><p className="eyebrow">MONDAY, SEPTEMBER 6</p><h1>Good morning, Mohan <span>✦</span></h1><p className="subtitle">Here’s what needs your focus today.</p></div><div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? '☀' : '☾'}</button><button className="icon-button" aria-label="Notifications"><Bell size={19} /></button><button className="primary-button" onClick={() => setModalOpen(true)}><CirclePlus size={18} />New task</button></div></header>
      <section className="metrics"><Metric label="TASKS LEFT" value={String(tasks.length - done).padStart(2, '0')} note="Focus on the next right thing" /><Metric label="IN PROGRESS" value={String(inProgress).padStart(2, '0')} note="Moving forward today" /><Metric label="COMPLETED" value={`${Math.round((done / Math.max(tasks.length, 1)) * 100)}%`} note="Great work—keep it up" /></section>
      <section className="task-panel" id="tasks"><div className="panel-head"><div><h2>Your tasks</h2><p>{visibleTasks.length} tasks matching your view</p></div><div className="toolbar"><label className="search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tasks" /></label><select value={filter} onChange={event => setFilter(event.target.value as 'All' | Status)} aria-label="Filter tasks"><option>All</option>{statuses.map(status => <option key={status}>{status}</option>)}</select></div></div><div className="task-list">{visibleTasks.map(task => <TaskRow key={task.id} task={task} onComplete={completeTask} />)}{visibleTasks.length === 0 && <div className="empty">No tasks match this view.</div>}</div></section>
    </section>
    {modalOpen && <TaskModal onClose={() => setModalOpen(false)} onSave={addTask} />}
  </main>
}

function Metric({ label, value, note }: { label: string, value: string, note: string }) { return <article className="metric"><p>{label}</p><strong>{value}</strong><small>{note}</small></article> }
function TaskRow({ task, onComplete }: { task: Task, onComplete: (id: string) => void }) { return <article className={`task-row ${task.status === 'Done' ? 'is-done' : ''}`}><button className="complete" onClick={() => onComplete(task.id)} aria-label={`Complete ${task.title}`}>{task.status === 'Done' && <CheckCircle2 size={18} />}</button><div className="task-copy"><h3>{task.title}</h3><p>{task.description}</p><span className="tag">{task.tag}</span></div><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><span className="due">{task.dueDate}</span></article> }
function TaskModal({ onClose, onSave }: { onClose: () => void, onSave: (task: Omit<Task, 'id'>) => void }) {
  const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [priority, setPriority] = useState<Priority>('Medium'); const [status, setStatus] = useState<Status>('Backlog')
  return <div className="modal-backdrop" role="presentation"><form className="modal" onSubmit={event => { event.preventDefault(); if (title.trim()) onSave({ title, description, priority, status, dueDate: 'Today', tag: 'Personal' }) }}><button className="close" type="button" onClick={onClose}><X size={18} /></button><p className="eyebrow">PLAN WITH INTENTION</p><h2>Create a task</h2><label>Task name<input autoFocus value={title} onChange={event => setTitle(event.target.value)} placeholder="What needs to happen?" required /></label><label>Short description<textarea value={description} onChange={event => setDescription(event.target.value)} placeholder="Add useful context" rows={3} /></label><div className="form-grid"><label>Priority<select value={priority} onChange={event => setPriority(event.target.value as Priority)}>{priorities.map(item => <option key={item}>{item}</option>)}</select></label><label>Status<select value={status} onChange={event => setStatus(event.target.value as Status)}>{statuses.map(item => <option key={item}>{item}</option>)}</select></label></div><button className="primary-button save" type="submit">Create task</button></form></div>
}
export default App
