const SelectSection = ({ title, children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-10">
      <h2 className="flex w-full justify-center items-center text-2xl font-bold text-black">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SelectSection;
