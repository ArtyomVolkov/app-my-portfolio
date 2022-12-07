import React, { useState } from 'react';

import { mergeClassNames } from '@utils/common';

import './style.scss';

const TempPage = () => {
  const [fullwidth, setFullwidth] = useState(false);

  return (
    <div className="gallery-app">
      <header className="header">Header</header>
      <div className="tabs">Tabs</div>
      <div className={mergeClassNames([
        'tab-content',
        fullwidth && 'fullwidth'
      ])}>
        <div className="sidebar">
          <div className="sidebar-content">
            Filters
          </div>
        </div>
        <div className="main">
          <div className="main-content">
            <div className="headline">
              <button onClick={() => setFullwidth(!fullwidth)}>fullwidth</button>
            </div>
            <div className="templates">
              <div className="template-content">
                Templates
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TempPage;
