type InfoRowProps = {
    label: string;
    value?: string | null;
    editable?: boolean;
    onEdit?: () => void;
    className?: string;
    classNameValue?: string
};

export const InfoRow = ({ label, value = '-', editable, onEdit, className = '', classNameValue }: InfoRowProps) => (
    <div className={`flex flex-row justify-between items-start sm:items-center text-custom-grayD-800 dark:text-custom-whiteD ${className}`}>
        <p className={`text-[16px] font-normal ${classNameValue}`}>{label}</p>
        <div className="flex items-center justify-end   text-right">
            <span className={`${value == "-" ? "font-semibold" : "font-normal"} `} >

                {value}
            </span>
            {editable && (
                <button
                    className="ml-6 h-6 w-10 transition-all  text-[16px] font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
                    onClick={onEdit}
                >
                    Editar
                </button>
            )}
        </div>

    </div>
);