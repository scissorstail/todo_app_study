/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import tw from 'twin.macro';
import 'normalize.css'

const layout = {
  root: css`
    ${tw`flex items-center h-screen`};
  `,
  page: css`
    ${tw`m-auto box-border p-6 overflow-y-auto`};
    width: 375px;
    height: 812px;
    border-radius: 2.5rem;
    border: solid 24px white;
    background-color: rgb(251,251,251);
    box-shadow: 14px 14px 12px 0px rgb(0 0 0 / 30%);

    &::-webkit-scrollbar {
      width: 0px;
    }
  `,
}

const form = {
  label: css`
    ${tw`block text-base font-medium`};
  `,
  input: css`
    ${tw`h-8 text-base box-border rounded`};
    border: 1px solid rgb(0 0 0 / 30%);

    &:focus {
      ${tw`outline-none border-solid border-2`};
      border-color: rgb(53,211,136);
    }
  `,
  button: css`
    ${tw`
      h-12 text-base font-medium rounded border-0
      focus:outline-none focus:border-solid focus:border-2
    `};
    color: white;
    background-color: rgb(53,211,136);

    &:hover {
      filter: brightness(90%);
    }

    &:focus { 
      border-color: rgb(0 0 0 / 30%)
    }
  `,
  button_alt: css`
    ${tw`
      h-12 text-base font-medium rounded border-0
      focus:outline-none focus:border-solid focus:border-2
    `};
    color: rgb(53,211,136);
    background-color: rgb(251,251,251);

    &:hover {
      filter: brightness(90%);
    }

    &:focus {
      border-color: rgb(53,211,136);
    }
  `,
  checkbox: css`
    background-color: #fff;
    border: 3px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    left: 0;
    position: absolute;
    top: -4px;;
    width: 20px;

    &:after {
      border: 3px solid rgb(53,211,136);
      border-top: none;
      border-right: none;
      content: "";
      height: 4px;
      left: 4px;
      opacity: 0;
      position: absolute;
      top: 5px;
      transform: rotate(-45deg);
      width: 9px;
    }
  `,
  select: css`
    ${tw`
      outline-none text-base font-medium rounded
      border-2 border-transparent focus:border-solid`
    }

    &:focus {
      border-color: rgb(53,211,136);
    }
  `
}

export { layout, form };