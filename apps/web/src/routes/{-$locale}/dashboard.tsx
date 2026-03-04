import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/{-$locale}/dashboard")({
  component: DashboardRouteComponent,
});

const DASHBOARD_CARD_IDS = [
  "due-today",
  "needs-attention",
  "import-jobs",
] as const;

function DashboardRouteComponent() {
  const content = useIntlayer("dashboard-page");

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <Badge variant="outline">{content.kicker}</Badge>
        <div className="space-y-2">
          <h1 className="font-semibold text-3xl tracking-tight">
            {content.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base">
            {content.description}
          </p>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <Card key={DASHBOARD_CARD_IDS[index]}>
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
