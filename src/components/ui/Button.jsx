import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  const allClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild) {
    return (
      <Link className={allClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
