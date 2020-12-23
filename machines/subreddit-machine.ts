import fetch from "node-fetch";
import { assign, createMachine } from "xstate";

function invokeFetchSubreddit(context) {
  const { subreddit } = context;

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => json.data.children.map((child) => child.data));
}

type Post = {
  title: string;
};

type Context = {
  subreddit: string;
  posts: Post[] | null;
  lastUpdated: Date | null;
};

export default function createSubredditMachine(subreddit: string) {
  return createMachine<Context>({
    id: "subreddit",
    initial: "loading",
    context: {
      subreddit,
      posts: null,
      lastUpdated: null,
    },
    states: {
      loading: {
        invoke: {
          id: "fetch-subreddit",
          src: invokeFetchSubreddit,
          onDone: {
            target: "loaded",
            actions: assign({
              posts: (_, event) => event.data,
              lastUpdated: () => Date.now(),
            }),
          },
        },
      },
      loaded: {
        on: {
          REFRESH: "loading",
        },
      },
      failure: {
        on: {
          RETRY: "loading",
        },
      },
    },
  });
}
