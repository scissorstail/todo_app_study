/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import { useStore } from "../stores";
import { layout, form } from "../styles"
import TodoList from '../components/TodoList'

const TodoMain = observer(() => {
  const history = useHistory();
  const { todoStore } = useStore();
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    fetchData().then(() => setIsRunning(false))
  })

  const fetchData = () => {
    return todoStore.todoGet()
  }

  return (
    <div css={layout.page}>
      {isRunning && (<span style={{ position: 'fixed', top: 0, left: 0 }}>Loading...</span>)}
      <header css={tw`flex text-xl font-bold h-12`}>
        <button css={form.button_alt} onClick={() => history.replace('/todo-priority')}>기본순서 표시</button>
        <button css={[form.button_alt, tw`ml-auto`]} style={{ alignSelf: 'start' }} onClick={() => history.push('/mypage')}>내정보</button>
      </header>
      <h1 css={tw`py-8 text-xl font-bold`}>할 일</h1>
      <TodoList></TodoList>
      <footer>
      </footer>
    </div >
  );
});

export default TodoMain;
