
const Footer = () => {
  return (
    <footer className="bg-card    p-4 ">
      <div className="max-w-6xl text-center">
        {/* Site name or logo */}
        <div className="text-xs  text-text">
           Hossam | All rights reserved. © {new Date().getFullYear()}
        </div>
       {/* x */}
      </div>
    </footer>
  );
};

export default Footer;
