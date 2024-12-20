const SelectSection = ({ title, description, children }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-10">
      <h2 className="flex w-full items-center text-xl font-bold text-black">
        {title}
      </h2>
      {description && (
        <h6 className="w-full text-gray-500 text-sm">{description}</h6>
      )}
      <hr className="w-full my-2" />
      {children}
    </div>
  );
};

export default SelectSection;
