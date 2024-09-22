import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data;
}

function App() {
  const { data, error, isPending } = useQuery({
    queryKey: ["total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return <div>Error</div>;

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>{isPending ? "..." : data?.total}</CardContent>
    </Card>
  );
}

export default App;
