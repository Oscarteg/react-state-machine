import { useService } from "@xstate/react";
import { format } from "date-fns";

export default function Subreddit({ service }) {
  const [current, send] = useService(service);

  if (current.matches("faileure")) {
    return (
      <div>
        Failed to load posts
        <button onClick={(_) => send("RETRY")}>Retry</button>
      </div>
    );
  }

  const { subreddit, posts, lastUpdated } = current.context;

  return (
    <section
      data-machine={service.machine.id}
      data-state={current.toStrings().join(" ")}
    >
      {posts && (
        <>
          <header>
            <h2>{subreddit}</h2>
            <small className="flex justify-between align-center">
              <div>Last updated: {format(lastUpdated, "Pp")} </div>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(_) => send("REFRESH")}
              >
                Refresh
              </button>
            </small>
          </header>

          {current.matches("loading") ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-400 rounded"></div>
                  <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <ul>
              {posts.map((post) => {
                return <li key={post.id}>{post.title}</li>;
              })}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
