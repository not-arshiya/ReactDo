import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)
  const [editId, setEditId] = useState(null) // tracks which todo is being edited, null = adding new

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let storedTodos = JSON.parse(todoString)
      setTodos(storedTodos)
    }
  }, [])

  // Now takes the array to save directly, instead of reading stale state.
  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  // Edit now just loads the todo's text into the input and remembers its id.
  // It does NOT delete or touch the todos array at all.
  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    if (!t) return
    setTodo(t.todo)
    setEditId(id)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS(newTodos)
    if (editId === id) {
      setEditId(null)
      setTodo("")
    }
  }

  // handleAdd now does two jobs depending on whether we're editing:
  // - editing: update the matching todo's text in place, same id
  // - not editing: create a new todo with a new id
  const handleAdd = () => {
    let newTodos

    if (editId) {
      newTodos = todos.map(item =>
        item.id === editId ? { ...item, todo: todo } : item
      )
      setEditId(null)
    } else {
      newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    }

    setTodos(newTodos)
    saveToLS(newTodos)
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

 return (
  <>
    <Navbar />
    <div className="mx-3 md:container md:mx-auto my-8 rounded-2xl p-6 bg-white shadow-lg min-h-[80vh] md:w-[40%] border border-gray-100">

      <h1 className='font-bold text-center text-2xl text-gray-800 mb-1'>ReactDo</h1>
      <p className='text-center text-sm text-gray-500 mb-6'>Manage your todos in one place</p>

      <div className="addTodo mb-6">
        <h2 className='text-lg font-semibold text-gray-700 mb-3'>
          {editId ? "Edit Todo" : "Add a Todo"}
        </h2>
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="What needs to be done?"
            className='w-full rounded-lg px-4 py-2 border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition'
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className='bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg px-5 py-2 text-sm font-semibold text-white transition'
          >
            {editId ? "Update" : "Save"}
          </button>
        </div>
      </div>

      <div className='flex items-center gap-2 mb-4'>
        <input
          className='w-4 h-4 accent-amber-500'
          id='show'
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label className='text-sm text-gray-600' htmlFor="show">Show finished</label>
      </div>

      <div className='h-px bg-gray-200 my-4'></div>

      <h2 className='text-lg font-semibold text-gray-700 mb-3'>Your Todos</h2>

      <div className="todos flex flex-col gap-2">
        {todos.length === 0 &&
          <div className='text-center text-gray-400 py-8 text-sm'>No todos yet — add one above.</div>
        }
        {todos.map(item => {
          return (showFinished || !item.isCompleted) &&
            <div key={item.id} className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition">
              <div className='flex items-center gap-3'>
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className='w-4 h-4 accent-amber-500'
                />
                <span className={item.isCompleted ? "line-through text-gray-400" : "text-gray-800"}>
                  {item.todo}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className='bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md p-2 transition'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className='bg-red-100 hover:bg-red-200 text-red-600 rounded-md p-2 transition'
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
        })}
      </div>

    </div>
  </>
)
}

export default App