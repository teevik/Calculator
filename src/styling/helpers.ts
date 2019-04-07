import { CSSObject, SerializedStyles } from "@emotion/core"

type BoxShadowAmount = 1 | 2 | 3 | 4 | 5 | 6

export const boxShadow = (amount: BoxShadowAmount) => {
  const size = (amount - 1) * 3

  return `0 ${3 + size}px ${6 + size}px rgba(0, 0, 0, 0.1)`
}

export const transition = (
  properties: string[],
  duration = "200ms",
  easing = "ease"
): CSSObject => {
  return {
    transitionTimingFunction: easing,
    transitionDuration: duration,
    transitionProperty: properties.join(","),
    willChange: properties.join(",")
  }
}

export const emotionClassName = (style: SerializedStyles) =>
  `.css-${style.name}`
