import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/{-$locale}/contacts")({
  component: ContactsRouteComponent,
});

const CONTACT_PLACEHOLDER_IDS = [
  "alex-johnson",
  "camille-martin",
  "noah-kim",
] as const;

function ContactsRouteComponent() {
  const content = useIntlayer("contacts-page");

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            {content.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            {content.description}
          </p>
        </div>
        <Button type="button">{content.primaryAction}</Button>
      </header>
      <div className="grid gap-4">
        {content.placeholders.map((placeholder, index) => (
          <Card key={CONTACT_PLACEHOLDER_IDS[index]}>
            <CardHeader>
              <CardTitle>{placeholder.name}</CardTitle>
              <CardDescription>{placeholder.meta}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {placeholder.note}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
