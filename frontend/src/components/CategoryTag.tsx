type Props = {
  description: string;
};

function CategoryTag({ description }: Props) {
  return (
    <p
      className={`flex items-center gap-2 py-1 px-4 text-sm bg-sky-700 text-white rounded-full h-[30px]`}
    >
      {description}
    </p>
  );
}

export default CategoryTag;
