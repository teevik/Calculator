import css from "@emotion/css"
import classNames from "classnames"
import { observer } from "mobx-react-lite"
import { rgba } from "polished"
import { InputModel } from "../models/InputModel"
import { OperatorInputModel } from "../models/OperatorInputModel"
import { fonts, mediaQueries } from "../styling/constants"

interface InputButtonProps {
  model: InputModel
}

export const InputButton: React.FC<InputButtonProps> = observer(props => {
  const { model } = props
  const { label, action, isActive, isMonospace } = model
  const innerClassName = classNames({ isActive, isMonospace })

  return (
    <button onClick={action} css={inputButtonStyles.container}>
      <span className={innerClassName} css={inputButtonStyles.inner}>
        {label}
      </span>
    </button>
  )
})

const inputButtonStyles = {
  container: css`
    position: relative;
    padding-bottom: 100%;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  `,

  inner: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${rgba("white", 0.8)};
    font-weight: 400;
    border: 3px solid #2dabbc;
    border-radius: 50%;

    transition: transform 50ms ease-in-out, background-color 100ms ease-in-out;

    &:active {
      transform: scale(0.9);
    }

    &.isActive {
      background-color: #2dabbc;
    }

    &.isMonospace {
      font-family: ${fonts.monospace};
      line-height: 1px;
    }

    @media ${mediaQueries.mobile} {
      font-size: 6vw;

      svg {
        height: 6vw;
      }
    }

    @media ${mediaQueries.desktop} {
      font-size: 18px;

      svg {
        height: 18px;
      }

      &:hover,
      &:focus {
        background-color: #2dabbc;
      }
    }
  `
}
