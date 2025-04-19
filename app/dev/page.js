import { DevScene } from "@/components/dev-scene";
import { enviroment } from "@/lib/env-vars";
import { redirect } from "next/navigation";

export default function DevPage() {
  if (enviroment !== "development") {
    return redirect("/");
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <DevScene />
    </main>
  );
}
