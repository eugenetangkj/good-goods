import { navLinks } from "@/constants";

//Right Drawer
function RightDrawer() {
    return (
        <div id="menu-drawer" className="fixed space-y-8 top-0 right-0 z-40 flex flex-col justify-center h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-good-goods-blue-100 w-80" tabIndex={-1} aria-labelledby="menu-drawer-label">

            {/* Close icon */}
            <button type="button" data-drawer-hide="menu-drawer" aria-controls="menu-drawer" className="text-black bg-transparent hover:text-wld-blue-900 rounded-full text-sm w-8 h-8 absolute top-6 end-8 inline-flex items-center justify-center duration-300" >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close menu</span>
            </button>


            {/* Drawer menu items */}
            <ul className='space-y-6 font-medium mt-8'>
                {/* Iterate through data */}
                {
                    navLinks.map((navLink) => {
                        return (
                            <li>
                                <a href={ navLink.route } key={ navLink.name } className="block rounded-full text-center py-2 px-3 text-lg md:hover:bg-transparent text-good-goods-blue-900 hover:text-sky-700 md:p-0 duration-200">{ navLink.name }</a>
                            </li>
                        );
                    })
                }
            </ul>      
        </div>
        


    ) 
}

export default RightDrawer;