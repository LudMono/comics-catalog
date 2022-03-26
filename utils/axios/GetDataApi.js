import axios from "axios";
import { BASE_URL, END_POINTS } from "../constants/api";
import md5 from "crypto-js/md5";

class GetDataApi {
  prepareAuthorization() {
    const timeStamp = Date.now();
    const privateKey = process.env.PRIVATE_KEY;
    const publicKey = process.env.PUBLIC_KEY;

    const hash = md5(timeStamp + privateKey + publicKey);
    const authorization = `?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;

    return authorization;
  }

  async getComics(endPoint, limit = 100) {
    const authorization = this.prepareAuthorization();
    const url = `${BASE_URL}${endPoint}${authorization}`;

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

  async getComicsCharacters(id) {
    const authorization = this.prepareAuthorization();
    const url = `${BASE_URL}${END_POINTS.comics}/${id}/${END_POINTS.characters}${authorization}`;
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
}

export default new GetDataApi();
