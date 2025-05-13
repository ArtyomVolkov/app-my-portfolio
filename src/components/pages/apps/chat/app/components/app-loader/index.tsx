import React from 'react';

import styles from './style.module.scss'

const AppLoader = () => {
  return (
    <div className={styles.appLoader}>
      <div className={styles.loader}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={styles.icon} width="1em" height="1em">
          <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="40" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                     keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"/>
          </circle>
          <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="100" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                     keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2">
            </animate>
          </circle>
          <circle fill="currentColor" stroke="currentColor" strokeWidth="24" r="15" cx="160" cy="100">
            <animate attributeName="opacity" calcMode="spline" dur="1.3" values="1;0;1;"
                     keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"/>
          </circle>
        </svg>
        <span className={styles.icon}/>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default AppLoader;