import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, account, user }) {
      try {
        // Check if user already exists
        const userResponse = await fetch(
          `http://localhost:5000/api/v1/users/${profile.id}`
        );

        if (userResponse.ok) {
          return true;
        }

        // If not, create new user
        const newUserResponse = await fetch(
          `http://localhost:5000/api/v1/users/sign_up`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: profile.email,
              fullName: profile.name,
              image: profile.image,
            }),
          }
        );

        if (newUserResponse.ok) {
          const data = await newUserResponse.json();
          const liked_songs = await fetch(
            `http://localhost:5000/api/v1/users/${data.id}/playlists/create_liked_songs_playlist`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: `${data.id}+1` }),
            }
          );

          return true;
        }
      } catch (error) {
        console.log("Error signing in", error);
        return false;
      }
    },
    async session({ session }) {
      const sessionUser = await fetch(
        `http://localhost:5000/api/v1/users/find_by_email/${session.user.email}`
      );
      const userData = await sessionUser.json();

      session.user.id = userData.id;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
