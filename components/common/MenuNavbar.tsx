
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";

export function MenuNavbar() {
  return (
    <Navbar fluid rounded className="sticky top-0 z-50 bg-good-goods-blue-100">
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-good-goods-blue-900">🩵 Welcome to Good Goods</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="#" className='text-base text-good-goods-blue-900 duration-200 mx-2 lg:mx-4'>About</NavbarLink>
        <NavbarLink href="#" className='text-base text-good-goods-blue-900 duration-200 mx-2 lg:mx-4'>Businesses</NavbarLink>
        <NavbarLink href="#" className='text-base text-good-goods-blue-900 duration-200 mx-2 lg:mx-4'>Recommend</NavbarLink>

      </NavbarCollapse>
    </Navbar>
  );
}
