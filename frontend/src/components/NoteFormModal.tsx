import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NewCategoryTag from "./NewCategoryTag";

type Props = {
  isOpen: boolean;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  onClose: () => void;
  newCategories: string[];
  setNewCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const NoteFormModal = ({
  isOpen,
  description,
  setDescription,
  onSave,
  onClose,
  newCategories,
  setNewCategories,
}: Props) => {
  const [category, setCategory] = useState<string>("");

  const onAddCategory = (newCategory: string) => {
    if (newCategory.trim() === "" || newCategories.includes(newCategory))
      return;
    setNewCategories((prev: string[]) => [...prev, newCategory]);
    setCategory("");
  };

  const onDeleteCategory = (category: string) => {
    setNewCategories((prev: string[]) => prev.filter((c) => c !== category));
  };

  if (!isOpen) return null;
  console.log(newCategories);
  return (
    <section className="fixed top-0 z-20 flex items-center justify-center w-full h-full backdrop-blur-sm">
      <div className="relative flex flex-col w-5/6 gap-4 md:w-1/2 lg:w-2/5 h-3/5 max-w-[600px] ">
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
        <div>
          <div className="flex flex-wrap h-[65px] gap-2 p-4 overflow-auto rounded-lg bg-zinc-700">
            {newCategories.length === 0 && (
              <p className="text-white">Categories will be shown here</p>
            )}
            {newCategories.map((category) => (
              <NewCategoryTag
                key={category}
                description={category}
                onDeleteCategory={onDeleteCategory}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            className="w-full px-4 text-white rounded-md bg-zinc-700"
            placeholder="Add category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <button
            className="px-4 py-2 font-bold text-white transition border-2 rounded-md hover:bg-sky-900 duration- bg-sky-700 border-sky-300 hover:border-sky-500 active:scale-95"
            onClick={() => onAddCategory(category)}
          >
            add
          </button>
        </div>
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
