export default function ({ redirect }) {
    const user = localStorage.getItem("user");
    if (!user) {
      return redirect("/"); // Redirect if user is not logged in
    }
  }
  