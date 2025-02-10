interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string; // Permite personalizar las clases del botón
}

export const CustomButton = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button className={`rounded-lg px-4 py-2 font-normal transition-all ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
