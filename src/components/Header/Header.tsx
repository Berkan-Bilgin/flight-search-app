import React, { useEffect, useRef, useState } from 'react';

const Header = () => {
  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // const [isHidden, setIsHidden] = useState(false);
  // const prevScrollY = useRef(0);

  // const handleScroll = () => {
  //   const currentScrollY = window.scrollY;
  //   if (currentScrollY > prevScrollY.current) {
  //     setIsHidden(true);
  //   } else {
  //     setIsHidden(false);
  //   }
  //   prevScrollY.current = currentScrollY;
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-orange-700 z-50 transition-transform duration-400 ease-in-out -translate-y-0`}
    >
      <div className="text-white mx-auto max-w-screen-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <nav>
          </nav>
          <nav>
            <div className="flex space-x-4">
              <a href="/#projects" onClick={handleClick('projects')}>
                Projects
              </a>
              <a href="/#contactme" onClick={handleClick('contactme')}>
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;