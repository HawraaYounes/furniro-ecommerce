
const Input = ({ label, name, placeholder, type = "text", width = "w-full" }) => {
  return (
    <div className={`flex flex-col items-start ${width}`}>
      <label
        htmlFor={name}
        className="block mb-[22px] font-medium font-poppins"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="bg-white border border-gray mb-3 py-[25px] px-[30px] rounded-[10px] focus:outline-none min-w-[400px] max-w-[500px]"
        required
      />
    </div>
  );
};

export default Input;
