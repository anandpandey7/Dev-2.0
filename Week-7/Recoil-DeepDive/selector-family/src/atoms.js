import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async () => {
      try {
        const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
        return res.data.todo;
      } catch (error) {
        console.error("Failed to fetch todo", error);

        // prevent infinite retry & crashing
        return {
          title: "Failed to load",
          description: "The server is not responding.",
          error: true
        };
      }
    },
  }),
});
