import { UnstyledButton } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import classes from "../App.module.css";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function NavButton({ to, children, onClose }: NavButtonProps) {
  const location = useLocation();
  
  const handleClick = () => {
    onClose?.();
  };
  
  return (
    <UnstyledButton
      className={`${classes.control} ${location.pathname === to ? classes.active : ''}`}
      component={Link}
      to={to}
      onClick={handleClick}
    >
      {children}
    </UnstyledButton>
  );
} 