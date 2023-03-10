const loadMirage = () => import("miragejs");

export function loadMirageInDev() {
  if (process.env.NODE_ENV === "development") {
    loadMirage().then(({ Server }) => {
      return new Server({
        routes() {
          this.namespace = "http://mockapi:1234";

          this.get("/admin/statistics", () => {
            return [{
				answer: "Statistics found",
				nbTags: 999,
				nbUsers: 888,
				topTags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
				error: 0
			}];
          });
          
        },
      });
    });
  }
}