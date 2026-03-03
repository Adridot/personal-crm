import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shellCopy } from "@/copy/shell-copy";

export const Route = createFileRoute("/contacts")({
  component: ContactsRouteComponent,
});

function ContactsRouteComponent() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            {shellCopy.contacts.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            {shellCopy.contacts.description}
          </p>
        </div>
        <Button type="button">{shellCopy.contacts.primaryAction}</Button>
      </header>
      <div className="grid gap-4">
        {shellCopy.contacts.placeholders.map((placeholder) => (
          <Card key={placeholder.name}>
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
