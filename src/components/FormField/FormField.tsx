
interface Props {
    label: string;
    name: string;
    type?: "text" | "email" | "password" | "select" | "checkbox";
    options?: { label: string, value: string }[];
    register: any;
    errors: any;
    className?: string;
    validations?: any;
    [key: string]: any;
    
}
export const FormField = ({ label, name, type = "text", options = [], register, errors, className, validations,...rest}: Props) => {
    const inputClassName = `${className} ${errors[name] ? "input-error" : ""}`;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        {type === "select" ? (
          <select className={`select ${inputClassName}`} {...register(name, validations)} {...rest}>
            <option value="">Seleccionar</option>
            {options.map((option, index ) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className={`input ${inputClassName}`}
            placeholder={type !== "checkbox" ? label : undefined}
            {...register(name, validations)}
            {...rest}
          />
        )}
        {errors[name] && <p className="f-error">{errors[name]?.message}</p>}
      </div>
    );
  };