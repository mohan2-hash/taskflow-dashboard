import type { Status, Task } from './types'

export function filterTasks(tasks: Task[], query: string, status: 'All' | Status) {
  const normalizedQuery = query.trim().toLowerCase()
  return tasks.filter(task =>
    (status === 'All' || task.status === status) &&
    `${task.title} ${task.description} ${task.tag}`.toLowerCase().includes(normalizedQuery),
  )
}

export function completeTask(tasks: Task[], id: string): Task[] {
  return tasks.map(task => task.id === id ? { ...task, status: 'Done', dueDate: 'Completed' } : task)
}
