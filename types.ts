export type Status = 'Backlog' | 'In progress' | 'Done'
export type Priority = 'High' | 'Medium' | 'Low'

export type Task = {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  dueDate: string
  tag: string
}
