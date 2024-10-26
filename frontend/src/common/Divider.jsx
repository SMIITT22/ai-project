const Divider = ({ className = "", ...props }) => {
  return (
    <hr
      className={`border-gray-300 dark:border-gray-700 ${className}`}
      {...props}
    />
  );
};

export default Divider;
