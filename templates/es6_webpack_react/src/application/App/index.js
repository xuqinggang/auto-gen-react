import React from 'react';
import { render } from 'react-dom';

import createHistory from 'history/createBrowserHistory';

// 全局样式
import 'styles/index.less';

const history = createHistory();

render(
    <div>
        es6_webpack_react
    </div>,
    document.getElementById('root'),
);
