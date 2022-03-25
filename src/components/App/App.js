import { endPoints } from "../../../utils/constants";
import getDataApi from "../../../utils/axios/GetDataApi";

import './App.css'

class App {
  async render() {
    const response = await getDataApi.getData(endPoints.comics);
    console.log(response.data.data.results);
  }
}

export default new App();
