import React, { useState } from 'react'
import './ToDoList.css'

const ToDoList = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const handleInputChange = (e) => {
    setNewTask(e.target.value)
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
          priority: 'Low',
          category: '',
          confirmed: false,
        },
      ])
      setNewTask('')
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handlePriorityChange = (taskId, priority) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, priority } : task))
    )
  }

  const handleCategoryChange = (taskId, category) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, category } : task))
    )
  }

  const handleConfirmation = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, confirmed: true } : task
      )
    )
  }

  const getPriorityStars = (priority) => {
    switch (priority) {
      case 'High':
        return ' ✩✩✩'
      case 'Medium':
        return ' ✩✩'
      case 'Low':
        return '✩'
      default:
        return ''
    }
  }

  const sortedTasks = tasks.slice().sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className='todo-app'>
      <div className='add-task'>
        <input
          type='text'
          placeholder='Add a new task...'
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className='task-list'>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.confirmed ? 'flex-row' : ''}`}
            style={{
              backgroundColor: task.completed ? '#e6e6e6' : '#68962b',
            }}
          >
            <span onClick={() => toggleCompletion(task.id)}>{task.text}</span>
            {task.confirmed ? (
              <>
                <div className='task-details'>
                  <span className='category'>
                    {task.category && `${task.category}`}
                  </span>
                  {getPriorityStars(task.priority)}
                </div>
                <div className='buttons'>
                  <button
                    className='delete-button'
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='task-details'>
                  <label>Priority:</label>
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      handlePriorityChange(task.id, e.target.value)
                    }
                    className='select-category'
                  >
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                  <label>Category:</label>
                  <input
                    type='text'
                    value={task.category}
                    onChange={(e) =>
                      handleCategoryChange(task.id, e.target.value)
                    }
                    className='select-category'
                  />
                </div>
                <div className='buttons'>
                  <button
                    className='delete-button'
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className='confirm-button'
                    onClick={() => handleConfirmation(task.id)}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
