import "regenerator-runtime/runtime";

import App from "../src/components/App/App";
import Comics from "./components/Comics/Comics";

(async () => {
  await App.render();
  Comics.clickHander()
})();
