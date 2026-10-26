import type { Task } from './types'

export const initialTasks: Task[] = [
  { id: '1', title: 'Design dashboard overview', description: 'Create the first-pass desktop and mobile layouts.', status: 'In progress', priority: 'High', dueDate: 'Today', tag: 'Design' },
  { id: '2', title: 'Implement task filters', description: 'Filter by priority, status and upcoming deadline.', status: 'In progress', priority: 'Medium', dueDate: 'Today', tag: 'Frontend' },
  { id: '3', title: 'Write onboarding copy', description: 'Make the first-run experience concise and friendly.', status: 'Backlog', priority: 'Low', dueDate: 'Tomorrow', tag: 'Product' },
  { id: '4', title: 'Connect analytics events', description: 'Track create, complete and archive actions.', status: 'Backlog', priority: 'Medium', dueDate: 'Sep 10', tag: 'Growth' },
  { id: '5', title: 'Ship weekly planning flow', description: 'Users can complete their weekly plan in one focused view.', status: 'Done', priority: 'High', dueDate: 'Completed', tag: 'Product' },
]
