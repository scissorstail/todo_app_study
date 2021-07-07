import { createContext, useContext } from 'react';
import UserStore from './UserStore';
import TodoStore from './TodoStore';

class RootStore {
  userStore
  todoStore

  constructor() {
    this.userStore = new UserStore(this)
    this.todoStore = new TodoStore(this)
  }
}

export const store = new RootStore()

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};