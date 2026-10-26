import { describe, expect, it } from 'vitest'
import { initialTasks } from './data'
import { completeTask, filterTasks } from './task-utils'

describe('filterTasks', () => {
  it('matches tasks by a case-insensitive search query', () => {
    expect(filterTasks(initialTasks, 'dashboard', 'All').map(task => task.id)).toEqual(['1'])
  })

  it('combines status and search filters', () => {
    expect(filterTasks(initialTasks, 'task', 'In progress').map(task => task.id)).toEqual(['2'])
  })
})

describe('completeTask', () => {
  it('marks only the chosen task as done', () => {
    const updated = completeTask(initialTasks, '2')
    expect(updated.find(task => task.id === '2')).toMatchObject({ status: 'Done', dueDate: 'Completed' })
    expect(updated.find(task => task.id === '1')?.status).toBe('In progress')
  })
})
