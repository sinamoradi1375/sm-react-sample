import axios from "axios";

const baseUrl = "https://60f3032c6d44f30017788866.mockapi.io/api";

const agent = {
  users: {
    getUsers: () => {
      return axios.get(`${baseUrl}/users`);
    },
  },
};
export default agent;
