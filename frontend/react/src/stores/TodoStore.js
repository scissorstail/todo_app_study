import { runInAction, makeAutoObservable } from 'mobx';
import axios from '../services/axios'

export default class TodoStore {
  root = null
  state = {
    todos: []
  }

  constructor(root) {
    this.root = root;
    makeAutoObservable(this);
  }

  get todos() {
    return this.state.todos
  }

  async todoGet(params = {}) {
    const { data } = await axios.get(`/apis/v1/todo/`, {
      params
    })

    runInAction(() => this.state.todos = data.results || data)
  };

  async todoCreate({ title = '', is_checked = false, priority = 3 } = {}) {
    const nextIndex = this.state.todos.length
    runInAction(() => {
      this.state.todos.push({ id: nextIndex * -1, title, is_checked, priority })
    })

    try {
      const { data } = await axios.post('/apis/v1/todo/', {
        title,
        is_checked,
        priority
      })

      runInAction(() => this.state.todos[nextIndex] = data)
    } catch (e) {
      this.todoGet()
    }
  };

  async todoPatch(id, payload = {}) {
    const foundIndex = this.state.todos.findIndex(todo => todo.id === id)
    if (foundIndex !== -1) {
      runInAction(() => {
        this.state.todos[foundIndex] = { ...this.state.todos[foundIndex], ...payload }
      })
    }

    await axios.patch(`/apis/v1/todo/${id}/`, payload)

    if (foundIndex !== -1) {
      const { data } = await axios.get(`/apis/v1/todo/${id}/`)

      runInAction(() => {
        this.state.todos[foundIndex] = data
      })
    }
  };

  async todoDestroy(id) {
    const foundIndex = this.state.todos.findIndex(todo => todo.id === id)
    runInAction(() => this.state.todos.splice(foundIndex, 1))

    try {
      await axios.delete(`/apis/v1/todo/${id}/`)
    } catch (e) {
      this.todoGet()
    }
  };
}
