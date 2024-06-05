import { XCircleIcon } from "@heroicons/react/24/outline";

const NoteFormModal = ({
  isOpen,
  description,
  setDescription,
  onSave,
  onClose,
}: any) => {
  if (!isOpen) return null;

  return (
    <section className="fixed top-0 z-20 flex items-center justify-center w-full h-full backdrop-blur-sm">
      <div className="relative flex flex-col w-5/6 gap-4 md:w-1/2 lg:w-2/5 h-2/5 max-w-[600px] ">
        <div className="flex justify-end">
          <XCircleIcon
            width={30}
            height={30}
            className="cursor-pointer text-zinc-200 hover:text-sky-300"
            onClick={onClose}
          />
        </div>
        <textarea
          className="w-full h-full p-4 text-white rounded-md bg-zinc-700"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white transition border-2 rounded-md hover:bg-sky-900 duration- bg-sky-700 border-sky-300 hover:border-sky-500 active:scale-95"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default NoteFormModal;
