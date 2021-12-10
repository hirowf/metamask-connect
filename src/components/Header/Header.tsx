import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="fixed top-0 w-full  bg-white z-30 transition-all ease duration-150">
        <div className="fixed top-0 w-full  bg-white z-30 transition-all ease duration-150">
          <div className="flex justify-start items-center gap-4 xl:gap-6 w-full">
            <Link></Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
