import "regenerator-runtime/runtime";

import { endPoints } from "../utils/constants";
import GetDataApi from "../utils/axios/GetDataApi";

const getDataApi = new GetDataApi();

(async () => {
  const response = await getDataApi.getData(endPoints.comics);
  console.log(response.data.data.results);
})();
