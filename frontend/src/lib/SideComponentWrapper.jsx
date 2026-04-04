const SideComponentWrapper = ({ children }) => {
  return (
    <div className="relative w-full px-4 py-4 sm:px-3 sm:py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 mx-auto my-3 md:my-2 max-w-screen-2xl">
      <div className="relative w-full">{children}</div>
    </div>
  );
};

export default SideComponentWrapper;
