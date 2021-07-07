/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import tw from 'twin.macro';
import React, { useState } from 'react';
import { useStore } from "../stores";
import { form } from "../styles"

const TodoItem = (props) => {
  const { todoStore } = useStore();
  const todo = props.info
  const refresh = props.refresh || (() => { })
  const [isEdit, setIsEdit] = useState(false)

  const todoDestroy = async (todo) => {
    await todoStore.todoDestroy(todo.id)
  }

  const todoToggleCheck = async (todo) => {
    await todoStore.todoPatch(todo.id, {
      is_checked: !todo.is_checked
    })
  }

  const todoChangePriority = async (todo, value) => {
    await todoStore.todoPatch(todo.id, {
      priority: value
    })

    refresh()
  }

  const todoChangeTitle = async (todo, value) => {
    setIsEdit(false)

    if (!value) {
      return alert('내용을 입력해주세요')
    }

    await todoStore.todoPatch(todo.id, {
      title: value
    })
  }

  const handleEditKeyDown = async (e, todo) => {
    if (e.key === 'Enter') {
      todoChangeTitle(todo, e.target.value)
      return
    }

    if (e.keyCode === 27) { // esc
      setIsEdit(false)
    }
  }

  return (
    <div css={tw`flex my-8 items-center`}>
      <div css={tw`relative`}>
        <input
          type="checkbox"
          id={"checkbox-" + todo.id}
          checked={todo.is_checked}
          onChange={(e) => todoToggleCheck(todo)}
          css={[css`width: 26px`, tw`invisible`]}
        ></input>
        <label css={[form.checkbox, css`${todo.is_checked && 'border: 3px solid rgb(53,211,136); &:after { opacity: 1; }'}`]} htmlFor={"checkbox-" + todo.id}></label>
      </div>
      {!isEdit
        ? (<span css={[tw`flex-1 ml-3 text-sm overflow-ellipsis overflow-hidden`, css`${todo.is_checked && 'color: #ccc;'}`]} onClick={() => setIsEdit(true)}>{todo.title}{isEdit}</span>)
        : (<input type="text" css={tw`flex-1 w-full ml-3 text-sm`} defaultValue={todo.title} onKeyDown={(e) => handleEditKeyDown(e, todo)} onBlur={(e) => todoChangeTitle(todo, e.target.value)} autoFocus />)
      }
      <select css={[form.select]} value={todo.priority} onChange={(e) => todoChangePriority(todo, e.target.value)}>
        <option value={1}>높음</option>
        <option value={2}>중간</option>
        <option value={3}>낮음</option>
      </select>
      <button css={[form.button_alt, tw`ml-1 h-8 w-8`]} onClick={() => todoDestroy(todo)}>x</button>
    </div>
  )
}

export default TodoItem;