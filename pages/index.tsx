import { useMachine } from "@xstate/react";
import redditMachine from "../machines/redditMachine";

export default function Home() {
  const [current, send] = useMachine(redditMachine);
  const { subreddit, posts } = current.context;

  const subreddits = ["frontend", "reactjs", "vuejs"];

  return (
    <main>
      <header></header>
      <select
        name=""
        id=""
        onChange={(e) => send("SELECT", { name: e.target.value })}
      >
        {subreddits.map((subreddit) => (
          <option key={subreddit}>{subreddit}</option>
        ))}
      </select>
      <section>
        <ul>
          {posts && posts.map((post) => <li key={post.title}>{post.title}</li>)}
        </ul>
      </section>
    </main>
  );
}
