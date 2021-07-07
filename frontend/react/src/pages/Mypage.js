/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import axios from '../services/axios'
import { useStore } from "../stores";
import { layout, form } from "../styles"

const Mypage = observer(() => {
  const history = useHistory();
  const { userStore } = useStore();
  const [isRunning, setIsRunning] = useState(true)
  const [nickname, setNickname] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  useEffect(() => {
    setIsRunning(false)

    setNickname(userStore.user.nickname)
  }, [userStore.user.nickname])

  const logout = async () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) {
      return;
    }

    userStore.userLogout()
  }

  const changeUserDetail = async () => {
    if (isRunning) {
      return;
    }

    if (!nickname) {
      return alert('닉네임을 입력해주세요')
    }

    try {
      setIsRunning(true);

      await userStore.userDetailPatch({
        nickname
      })

      alert('변경완료')
    } finally {
      setIsRunning(false);
    }
  }

  const handleKeyDown = async (e) => {
    if (isRunning) {
      return;
    }

    try {
      setIsRunning(true);
      if (e.key === 'Enter') {
        await changeUserDetail()
      }
    } finally {
      setIsRunning(false);
    }
  }

  const changePassword = async () => {
    if (isRunning) {
      return;
    }

    if (!oldPassword) {
      return alert('기존 비밀번호를 입력해주세요')
    }

    if (!newPassword) {
      return alert('새 비밀번호를 입력해주세요')
    }

    if (newPassword && newPassword.length < 8) {
      return alert('비밀번호는 8자 이상 입력해주세요')
    }

    if (!newPassword2) {
      return alert('비밀번호 확인을 입력해주세요')
    }

    if (newPassword !== newPassword2) {
      return alert('비밀번호 확인이 일치하지 않습니다')
    }

    try {
      setIsRunning(true)

      await axios.put('/apis/v1/user/change_password/', {
        old_password: oldPassword,
        new_password: newPassword,
      })

      setOldPassword('')
      setNewPassword('')
      setNewPassword2('')

      alert('비밀번호 변경이 완료되었습니다')
    } catch (e) {
      console.error(e)
      alert('비밀번호 오류. 기존 비밀번호를 확인해주세요')
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div css={layout.page}>
      {isRunning && (<span style={{ position: 'fixed', top: 0, left: 0 }}>Loading...</span>)}
      <header css={tw`flex text-xl font-bold h-12`}>
        <button css={[form.button_alt]} onClick={() => history.goBack()}>뒤로가기</button>
        <button css={[form.button_alt, tw`ml-auto`]} onClick={logout}>로그아웃</button>
      </header>
      <h1 css={tw`py-8 text-xl font-bold`}>내정보</h1>
      <div css={tw`flex flex-col`}>
        <label css={[form.label, tw`mt-1 w-full`]}>이메일</label>
        <input
          type="text"
          css={[form.input, tw`mt-1 w-full border-transparent text-current`]}
          value={userStore.user.email}
          name="nickname"
          disabled
        ></input>
        <label css={[form.label, tw`mt-4 w-full`]}>닉네임</label>
        <input
          type="text"
          css={[form.input, tw`mt-1 w-full`]}
          value={nickname}
          name="nickname"
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        ></input>
        <button css={[form.button, tw`mt-4 w-full`]} name="nickname" onClick={() => changeUserDetail()}>변경</button>

        <hr css={[tw`my-8 opacity-20 w-full`]}></hr>

        <label css={[form.label, tw`w-full`]}>기존 비밀번호</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" autoComplete="newpassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
        <label css={[form.label, tw`mt-4 w-full`]}>새 비밀번호</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" autoComplete="newpassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
        <label css={[form.label, tw`mt-4 w-full`]}>비밀번호 확인</label>
        <input css={[form.input, tw`mt-1 w-full`]} type="password" autoComplete="newpassword" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)}></input>
        <button css={[form.button, tw`mt-4 w-full`]} onClick={changePassword}>비밀번호 변경</button>
      </div>
      <footer>
      </footer>
    </div >
  );
});

export default Mypage;
