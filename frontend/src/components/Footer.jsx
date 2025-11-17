// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto py-4 text-center">
        &copy; {new Date().getFullYear()} BlogMgmt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
