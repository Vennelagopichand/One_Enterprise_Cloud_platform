import {
  useEffect,
  useState
} from "react";

interface EmployeeAvatarProps {
  name: string;
  photo?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-xs rounded-xl",
  md: "h-14 w-14 text-sm rounded-2xl",
  lg: "h-20 w-20 text-lg rounded-2xl",
  xl: "h-28 w-28 text-2xl rounded-3xl"
};

function EmployeeAvatar({
  name,
  photo,
  size = "md",
  className = ""
}: EmployeeAvatarProps) {

  const [
    imageError,
    setImageError
  ] = useState(false);

  useEffect(
    () => {
      setImageError(false);
    },
    [photo]
  );

  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (word) =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const showImage =
    Boolean(photo) &&
    !imageError;

  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-blue-600
        to-indigo-600
        font-black
        text-white
        shadow-md
        shadow-blue-600/10
        ${sizeClasses[size]}
        ${className}
      `}
    >

      {
        showImage
          ? (
            <img
              src={photo}
              alt={`${name} profile`}
              onError={() =>
                setImageError(true)
              }
              className="
                h-full
                w-full
                object-cover
              "
            />
          )
          : (
            <span>
              {initials || "NA"}
            </span>
          )
      }

    </div>
  );
}

export default EmployeeAvatar;
