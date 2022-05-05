import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import store from "./Reducer/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* NOTE Provider에 감싸진 모든 컴포넌트는 Redux Store를 사용을 할 것이다. */}
      {/* NOTE 어떠한 store을 사용할지도 명시를 해준다. */}
      {/* NOTE 여기서 store은 하나의 저장소를 의미한다. */}
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
