import { PlusIcon } from "@heroicons/react/24/solid";

const Navbar = ({ onAddNote }: { onAddNote: () => void }) => (
  <nav className="sticky top-0 z-10 flex items-center justify-around w-full py-6 bg-zinc-900">
    <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
      Notes
    </h1>
    <button
      className="flex items-center gap-4 px-4 py-2 transition duration-150 border-2 rounded-md border-sky-300 hover:scale-105 bg-sky-700"
      onClick={onAddNote}
    >
      <span className="hidden font-semibold text-white sm:block">
        Add new note
      </span>
      <PlusIcon className="w-6 h-6 text-white border-2 border-white rounded-full" />
    </button>
  </nav>
);

export default Navbar;
