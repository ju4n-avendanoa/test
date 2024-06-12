function MarginContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-full px-6 md:px-10 py-14">
      {children}
    </div>
  );
}

export default MarginContainer;
