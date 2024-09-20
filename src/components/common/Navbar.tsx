import RightDrawer from './RightDrawer';
import { navLinks } from '@/constants';

//Navbar
function Navbar() {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="fixed w-full top-0 start-0 z-20 bg-good-goods-blue-100 p-8">         
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">  
                    {/* Good Goods Brand */}
                    <a href="/" className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-good-goods-blue-900">🩵 Good Goods</a>

                    {/* CTA and Mobile menu */}
                    <div className="flex md:hidden md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {/* Hamburger menu button */}
                        <button data-drawer-target="menu-drawer" data-drawer-show="menu-drawer" data-drawer-placement="right" aria-controls="menu-drawer" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden" aria-expanded="false">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button> 
                    </div>

            
                    {/* Desktop menu items */}
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4  border rounded-lg  md:space-x-8 lg:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                          {/* Iterate through data */}
                          {
                              navLinks.map((navLink) => {
                                  return (
                                    <li>
                                      <a href={ navLink.route } key={ navLink.name } className="block py-2 px-3 rounded text-base lg:text-lg hover:bg-gray-100 md:hover:bg-transparent text-good-goods-blue-900 md:hover:text-sky-700 md:p-0 duration-200">{ navLink.name }</a>  
                                    </li>  
                                  );
                              })
                          }
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Drawer for mobile menu navigation */}
            <RightDrawer />
        </div>
    ) 
}

export default Navbar;