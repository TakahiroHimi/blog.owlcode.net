import styles from "../styles/Home.module.css";
import { css } from "@emotion/react";

export default function Home() {
  return (
    <div className={styles.container}>
      <p css={test}>Hello!</p>
    </div>
  );
}

const test = css`
  color: red;
`;
