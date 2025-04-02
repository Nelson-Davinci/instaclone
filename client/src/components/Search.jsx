export default function Search() {
  return (
    <div
      className="tooltip tooltip-right flex gap-3 items-center p-3 cursor-pointer hover:font-bold hover:text-zinc-800 hover:transition duration-150 ease-out rounded-lg z-50"
      data-tip="Search"
    >
      <i className="ri-search-line text-2xl"></i>
      <span className="text-lg">Search</span>
    </div>
  );
}
