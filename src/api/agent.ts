import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com";

//functions to make api calls
const agent = {
  todo: {
    getTodos: () => {
      return axios.get(`${baseUrl}/todos`);
    },
  },
};
export default agent;
