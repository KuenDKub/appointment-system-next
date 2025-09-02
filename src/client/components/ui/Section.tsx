import { cn } from "@heroui/react";
import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className }) => (
  <section className={cn("p-4 bg-white rounded-large mx-2 my-4", className)}>
    {title && <h2>{title}</h2>}
    {children}
  </section>
);

export default Section;
