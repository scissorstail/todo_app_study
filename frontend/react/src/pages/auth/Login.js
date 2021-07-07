/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import tw from 'twin.macro';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from "../../stores";
import { layout, form } from "../../styles"

const Login = () => {
  const { userStore } = useStore();
  const history = useHistory();

  const [isRunning, setIsRunning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (isRunning) {
      return;
    }

    if (!email) {
      return alert('이메일을 입력해주세요')
    }

    if (!password) {
      return alert('비밀번호를 입력해주세요')
    }

    try {
      setIsRunning(true)

      await userStore.userlogin({
        email,
        password
      })

      history.push('/todo-main')
    } catch (e) {
      console.error(e)
      setIsRunning(false)

      alert('로그인에 실패했습니다')
    }
  }

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      login()
    }
  }


  return (
    <div css={layout.page}>
      <header css={tw`text-xl font-bold h-12`}></header>
      <h1 css={tw`py-8 text-xl font-bold`}>로그인</h1>
      <div>
        <label css={form.label}>아이디</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="text" name="email" onChange={(e) => { setEmail(e.target.value) }} /><br />

        <label css={[form.label, tw`mt-3`]}>비밀번호</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" name="password" autoComplete="off" onChange={(e) => { setPassword(e.target.value) }} onKeyPress={handleKeyDown} /><br />
      </div>
      <button css={[form.button, tw`mt-8 w-full`]} onClick={login}>로그인</button>
      <button css={[form.button_alt, tw`mt-1 w-full`]} onClick={() => { history.push('/register') }}>회원가입</button>
    </div>
  )
}

export default Login;