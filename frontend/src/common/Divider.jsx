// eslint-disable-next-line react/prop-types
const Divider = ({ className = "", ...props }) => {
  return <hr className={`border-gray-300 ${className}`} {...props} />;
};

export default Divider;
