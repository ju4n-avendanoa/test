import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  description: string;
  onDeleteCategory: (category: string) => void;
};

function NewCategoryTag({ description, onDeleteCategory }: Props) {
  return (
    <p
      className={`flex items-center gap-2 py-1 px-4 text-sm bg-sky-700 text-white rounded-full h-[30px]`}
    >
      {description}
      <XMarkIcon
        className="w-4 h-4 cursor-pointer"
        onClick={() => onDeleteCategory(description)}
      />
    </p>
  );
}

export default NewCategoryTag;
