export default function Button({
  title,
  children,
  className,
  onClick,
  icon,
  disabled,
  isRounded,
  type,
  alt,
  primary,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ease duration-300 flex flex-row items-center px-4 py-2 border-2 gap-1 border-admin_blue text-center w-fit ${
        isRounded ? "rounded-full" : "rounded-lg"
      } ${
        primary
          ? "border-admin_blue text-admin_blue hover:bg-admin_blue hover:text-white"
          : "bg-admin_blue text-white hover:text-admin_blue hover:bg-transparent hover:border-admin_blue"
      }
      ${className} ${
        alt &&
        "bg-admin_red border-admin_red text-white hover:text-admin_red hover:border-admin_red"
      }`}
    >
      {title || children}
    </button>
  );
}

export const ActionButton = ({ type, title, event, children, btnType }) => {
  return (
    <button
      type={btnType}
      onClick={event}
      className={`
        flex gap-2 ease rounded-lg hover:bg-transparent duration-300 text-white px-4 py-2 border-2 border-transparent items-center ${
          type == "edit"
            ? "bg-blue-600 hover:border-blue-600 hover:text-blue-600 "
            : "bg-red-600 hover:border-red-600 hover:text-red-600"
        }`}
    >
      {title || children}
    </button>
  );
};
