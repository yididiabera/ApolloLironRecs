import "@styles/LandingPage.css";
import Features from "@components/Features/Features";

const LandingPage = () => {
  const featuresData = {
    titles: ["Discover New Music", "Discover Artists", "Trending Now"],
    descriptions: [
      "Discover new music you'll fall in love with. ApolloLironRecs lets you enjoy your favorite tunes while introducing you to fresh tracks that match your taste.",
      "Stay ahead of the trends with our curated picks of emerging artists and hidden gems.",
      "Keep your playlist up-to-date with today's hottest tracks. Discover the songs that are winning over listeners worldwide.",
    ],
    images: [
      "https://images.unsplash.com/photo-1453738773917-9c3eff1db985?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/813940/pexels-photo-813940.jpeg",
      "https://images.pexels.com/photos/3965238/pexels-photo-3965238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-900 via-red-700 to-purple-800 p-10">
      <h1 className="text-white text-5xl font-bold text-center mb-16">
        ApolloLironRecs
      </h1>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {featuresData.titles.map((title, index) => (
          <div key={index} className="flex flex-col items-center bg-black bg-opacity-60 p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-500">
            {/* Feature Image */}
            <div className="w-full mb-6 relative">
              <img
                src={featuresData.images[index]}
                alt={title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black opacity-20 rounded-t-lg"></div>
            </div>
            {/* Feature Text */}
            <div className="text-center text-white">
              <h2 className="text-3xl font-semibold mb-4">{title}</h2>
              <p className="text-gray-300 text-lg">
                {featuresData.descriptions[index]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;