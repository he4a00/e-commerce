import CategoriesDropDown from "./CategoriesDropDown";
import DealsLink from "./DealsLink";
import HotLineNumber from "./HotLineNumber";

const SecNavbar = () => {
  return (
    <nav className="w-full border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 container mx-auto px-4 py-3 sm:py-0 gap-4 sm:gap-0">
        <div className="w-full sm:w-auto">
          <CategoriesDropDown />
        </div>
        <div className="w-full sm:w-auto">
          <DealsLink />
        </div>
        <div className="w-full sm:w-auto">
          <HotLineNumber />
        </div>
      </div>
    </nav>
  );
};

export default SecNavbar;
