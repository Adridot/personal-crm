import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shellText } from "@/copy/shell-text";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <Badge variant="outline">{shellText.dashboard.kicker}</Badge>
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            {shellText.dashboard.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            {shellText.dashboard.description}
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {shellText.dashboard.cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-2xl">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
