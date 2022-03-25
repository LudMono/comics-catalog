import axios from "axios";
import { BASE_URL } from "../constants/";
import md5 from "crypto-js/md5";

class GetDataApi {
  prepareUrl(endPoint) {
    const timeStamp = Date.now();
    const privateKey = process.env.PRIVATE_KEY;
    const publicKey = process.env.PUBLIC_KEY;

    const hash = md5(timeStamp + privateKey + publicKey);
    const url = `${BASE_URL}${endPoint}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    return url;
  }

  async getData(endPoint, limit = 100) {
    const url = this.prepareUrl(endPoint);

    try {
      const response = await axios.get(url, {
        params: {
          limit,
        },
      });
      return response;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default new GetDataApi();
