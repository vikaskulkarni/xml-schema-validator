import React from "react";
import styles from "./styles";

const Loader = (props) => (
  <div>
    <span className={styles.loaderItem} />
    <span className={styles.loaderItem} />
    <span className={styles.loaderItem} />
    <span className="loading-text">{props.text}</span>
  </div>
);

export default Loader;
