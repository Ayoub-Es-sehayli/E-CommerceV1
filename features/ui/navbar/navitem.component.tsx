import Link from "next/link";

export default function NavItem() {
  return (
    <li className="daisy-dropdown daisy-dropdown-hover">
      <label tabIndex={0}>
        <Link href="">
          <a className=" bg-transparent hover:bg-light p-1 m-1 lg:rounded-lg">
            visage
          </a>
        </Link>
      </label>
      <ul className="daisy-dropdown-content w-auto whitespace-nowrap hover:grid bg-white border border-primary-200">
        <li className="bg-transparent hover:bg-grey-200 px-2 py-1 ">
          <Link href="">
            <a>soin peau</a>
          </Link>
        </li>
        <li className="bg-transparent hover:bg-grey-200 px-2 py-1 ">
          <Link href="">
            <a>soin peau</a>
          </Link>
        </li>
      </ul>
    </li>
  );
}
