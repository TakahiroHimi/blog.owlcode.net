import { css } from "@emotion/react";

export default function Home() {
  return <p css={test}>Hello!</p>;
}

const test = css`
  color: red;
`;
