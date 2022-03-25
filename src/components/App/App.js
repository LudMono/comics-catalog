import "./App.css";
import Comics from "../Comics/Comics";

class App {
  async render() {
    await Comics.render();
  }
}

export default new App();
