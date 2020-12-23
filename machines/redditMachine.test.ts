import { interpret } from "xstate";
import redditMachine from "./redditMachine";

describe("reddit machine (live)", () => {
  it("should load posts of a selected subreddit", (done) => {
    const redditService = interpret(redditMachine)
      .onTransition((state) => {
        // when the state finally reaches 'selected.loaded',
        // the test has succeeded.

        if (state.matches({ selected: "loaded" })) {
          expect(state.context.posts).not.toBeNull();
          done();
        }
      })
      .start();

    // Test that when the 'SELECT' event is sent, the machine eventually
    // reaches the { selected: 'loaded' } state with posts
    redditService.send("SELECT", { name: "reactjs" });
  });
});
