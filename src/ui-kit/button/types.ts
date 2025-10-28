import type {ButtonHTMLAttributes} from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLLinkElement> {
  as?: string
}