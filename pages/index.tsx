import { useMachine } from "@xstate/react";
import Subreddit from "../components/Subreddit";
import redditMachine from "../machines/reddit-machine";

const subreddits = ["frontend", "reactjs", "vuejs"];

export default function Home() {
  const [current, send] = useMachine(redditMachine);
  const { subreddit } = current.context;

  return (
    <main
      className="container mx-auto prose"
      data-machine={redditMachine.id}
      data-state={current.toStrings().join(" ")}
    >
      <header>
        <h1>Finite state machine</h1>
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          onChange={(e) => send("SELECT", { name: e.target.value })}
        >
          {subreddits.map((subreddit) => (
            <option key={subreddit}>{subreddit}</option>
          ))}
        </select>
      </header>
      <div>
        <h1>{current.matches("idle") ? "Select a subreddit" : null}</h1>
        {subreddit && <Subreddit service={subreddit} key={subreddit?.id} />}
      </div>
    </main>
  );
}
