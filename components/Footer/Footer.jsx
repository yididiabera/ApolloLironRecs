import "./Footer.css";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-gray-950 text-gray-100 flex flex-col items-center gap-4">
      {/* Main Footer Content */}
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row justify-between items-center text-center lg:text-left px-4">
        
        {/* About Section */}
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg lg:text-xl font-semibold font-roboto text-white">
            About Us
          </h2>
          <p className="mt-2 text-xs lg:text-sm font-extralight text-gray-200 max-w-xs">
            Explore and enjoy top music that's perfect for you. We recommend tracks based on your tastes and keep you updated on the latest hits.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg lg:text-xl font-semibold font-roboto text-white">
            Contact Us
          </h2>
          <address className="mt-2 not-italic font-opensans text-xs lg:text-sm">
            <p>Email: <a href="mailto:yididiabera87@gmail.com" className="underline text-#add8e6;">yididiabera87@gmail.com</a></p>
            <p>Phone: <a href="tel:+251986173986" className="underline text-yellow-#add8e6;">+251 986 173 986</a></p>
            <p>Address: Addis Ababa, Ethiopia</p>
          </address>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="w-full max-w-screen-lg text-center mt-4 border-t border-purple-700 pt-2">
        <p className="text-xs font-extralight text-gray-200">
          &copy; 2024 ApolloLironRecs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
