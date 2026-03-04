import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const { isValid } = validatePrefix(params.locale);

    if (!isValid) {
      throw redirect({
        params: { locale: undefined },
        to: "/{-$locale}",
      });
    }
  },
  component: Outlet,
});
