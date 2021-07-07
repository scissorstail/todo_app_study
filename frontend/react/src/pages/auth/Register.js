/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import tw from 'twin.macro';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useStore } from "../../stores";
import { layout, form } from "../../styles"


const Register = () => {
  const { userStore } = useStore();
  const history = useHistory();

  const [isRunning, setIsRunning] = useState(false);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = async () => {
    if (isRunning) {
      return;
    }

    if (!email) {
      return alert('이메일을 입력해주세요')
    }

    if (!nickname) {
      return alert('닉네임을 입력해주세요')
    }

    if (!password) {
      return alert('비밀번호를 입력해주세요')
    }

    if (password !== password2) {
      return alert('비밀번호 확인이 일치하지 않습니다')
    }

    try {
      setIsRunning(true)

      await userStore.userRegister({
        email,
        nickname,
        password
      })

      alert('회원가입이 완료되었습니다')

      history.push('/login')
    } catch (e) {
      console.error(e)
      setIsRunning(false)

      alert('회원가입 중 오류가 발생했습니다')
    }
  }

  return (
    <div css={layout.page}>
      <header css={tw`text-xl font-bold h-12`}>
        <button css={[form.button_alt]} style={{ alignSelf: 'start' }} onClick={() => history.goBack()}>뒤로가기</button>
      </header>
      <h1 css={tw`py-8 text-xl font-bold`}>회원가입</h1>
      <div>
        <label css={[form.label, tw`mt-3`]}>이메일</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="text" name="email" maxLength="255" onChange={(e) => { setEmail(e.target.value) }} /><br />

        <label css={[form.label, tw`mt-3`]}>닉네임</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="text" name="nickname" autoComplete="off" maxLength="200" onChange={(e) => { setNickname(e.target.value) }} /><br />

        <label css={[form.label, tw`mt-3`]}>비밀번호</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" name="password" autoComplete="off" maxLength="128" onChange={(e) => { setPassword(e.target.value) }} /><br />

        <label css={[form.label, tw`mt-3`]}>비밀번호 확인</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" name="password2" autoComplete="off" maxLength="128" onChange={(e) => { setPassword2(e.target.value) }} /><br />
      </div>
      <button css={[form.button, tw`mt-8 w-full`]} onClick={register}>회원가입</button>
    </div>
  )
}

export default Register;