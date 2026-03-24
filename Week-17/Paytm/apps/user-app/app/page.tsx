import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Hello } from "@repo/ui/hello";

import { createUserWithEmail } from "../lib/userActions";

export default async function Home() {
  // Create a user on page load
  const user = await createUserWithEmail("ap@gmail.com", "AP User");

  return (
    <div className="text-3xl font-bold underline">
      <h1>User App</h1>
      <p>Created User: {user.email}</p>
      <p>Name: {user.name}</p>
      <Hello />
    </div>
  );
}
