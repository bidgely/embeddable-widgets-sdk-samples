import React from "react";
import styles from "./Compare.module.css"
import CompareSectionComponent from "./CompareSectionComponent";

function CompareComponent() {

  return (
    <div className={styles.compareRoot}>
      <div className={styles.compareMain}>

        <div className={styles.compareSectionCont}>
          <CompareSectionComponent id="compare-left"/>
        </div>

        <div className={styles.compareSectionCont}>
          <CompareSectionComponent id="compare-right"/>
        </div>
      </div>
    </div>
  )
}

export default CompareComponent