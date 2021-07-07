/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import tw from 'twin.macro';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from "../stores";
import TodoItem from './TodoItem'
import { form } from "../styles"

const TodoList = observer((props) => {
  const { todoStore } = useStore();
  const refresh = props.refresh
  const [title, setTitle] = useState('')

  const todoCreate = async () => {
    if (!title) {
      return alert('Title required')
    }
    setTitle('')
    await todoStore.todoCreate({ title })
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      todoCreate()
    }
  }

  return (
    <>
      <div css={tw`flex`}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          css={[form.input, tw`flex-1 min-w-0`]}
        ></input>
        <button css={[form.button, tw`ml-1 h-8 w-8`]} onClick={() => todoCreate()}>+</button>
      </div>
      {todoStore.todos.map(todo => (<TodoItem refresh={refresh} key={todo.id} info={todo} />))}
    </>
  );
});

export default TodoList;