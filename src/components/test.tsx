"use client";
       
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomInput = ({
  label,
  error,
  type,
  ...props
}: IInputProps) => {
  return (
    <div className=" ">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={type}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function Signup() {


  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-1/2">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <CustomInput
          label="Name"
          type="text"
        />

        <CustomInput
          label="Email"
          type="email"
        />

        <CustomInput
          label="Password"
        />

        <CustomInput
          label="Confirm Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}
  