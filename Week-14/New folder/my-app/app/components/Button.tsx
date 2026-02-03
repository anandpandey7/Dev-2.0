"use client";



interface ButtonProps {
  loading: boolean;
  handler: () => void;
  type: "signup" | "signin";
}

export const Button = ({loading,handler,type}: ButtonProps)=>{
    return (
        <button
            disabled={loading}
            type="button"
            onClick={handler}
            className="mt-8 w-11/12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-3 sm:mx-0"
          >
            {loading ? "Please wait..." : type === "signup" ? "Sign up" : "Sign in"}
          </button>
    )
}