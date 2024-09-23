import "@styles/globals.css";
import "@styles/app.css";

import Provider from "@components/Provider";
import Navbar from "@components/Navbar/Navbar";
import Footer from "@components/Footer/Footer";

export const metadata = {
  title: "ApolloLironRecs",
  description: "Discover new music that you'll love.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navbar />
            {children}
            <Footer />
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
