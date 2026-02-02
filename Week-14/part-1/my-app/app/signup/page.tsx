"use client";

import { ChangeEvent, useState } from "react";

export default function Signup() {
  const [type, setType] = useState<"signup" | "signin">("signup");
  const [loading, setLoading] = useState(false);

  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    setLoading(true);
    console.log(postInputs);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-2xl font-extrabold">
              Create an account
            </div>
            <div className="text-slate-400"></div>
          </div>

          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="John Doe"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="abc@email.com"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              })
            }
          />

          <LabelledInput
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            type="button"
            onClick={sendRequest}
            className="mt-8 w-11/12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-3 sm:mx-0"
          >
            {loading ? "Please wait..." : type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4 mx-3 sm:mx-0">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 mx-3 sm:mx-0"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
