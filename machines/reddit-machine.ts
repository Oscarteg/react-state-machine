import { assign, createMachine, spawn } from "xstate";
import subredditMachine from "./subreddit-machine";

const redditMachine = createMachine({
  id: "reddit",
  initial: "idle",
  context: {
    subreddits: {},
    subreddit: null,
  },
  states: {
    idle: {},
    selected: {},
  },
  on: {
    SELECT: {
      target: ".selected",
      actions: assign({
        subreddit: (context, event) => {
          // use excisting actor
          let subreddit = context.subreddits[event.name];

          if (subreddit) {
            return {
              ...context,
              subreddit,
            };
          }

          // spawn new subreddit actor
          subreddit = spawn(subredditMachine(event.name));

          return {
            subreddits: {
              ...context.subreddits,
              [event.name]: subreddit,
            },
            subreddit,
          };
        },
      }),
    },
  },
});

export default redditMachine;
