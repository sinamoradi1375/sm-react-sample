import axios from "axios";

const baseUrl = "https://60f3032c6d44f30017788866.mockapi.io/api";

//functions to make api calls
const agent = {
  todo: {
    getUsers: () => {
      return axios.get(`${baseUrl}/users`);
    },
  },
};
export default agent;
