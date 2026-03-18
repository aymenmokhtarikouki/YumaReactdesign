import { Outlet } from "react-router";
import { Toaster } from "sonner";

export function Root() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" theme="light" />
    </>
  );
}
