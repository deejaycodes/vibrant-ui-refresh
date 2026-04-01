import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import PortalLayout from "@/components/PortalLayout";
import { getAnalytics } from "@/lib/api";

const RISK_COLORS = ["hsl(0,72%,51%)", "hsl(38,92%,50%)", "hsl(210,80%,52%)", "hsl(152,60%,36%)"];

const Analytics = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getAnalytics()
      .then(setData)
      .catch(() => {
        setData({
          monthly: [
            { month: "Oct", cases: 32, referrals: 18 },
            { month: "Nov", cases: 41, referrals: 24 },
            { month: "Dec", cases: 28, referrals: 15 },
            { month: "Jan", cases: 45, referrals: 29 },
            { month: "Feb", cases: 38, referrals: 22 },
            { month: "Mar", cases: 52, referrals: 34 },
          ],
          riskDistribution: [
            { name: "Critical", value: 8 },
            { name: "High", value: 22 },
            { name: "Medium", value: 45 },
            { name: "Low", value: 25 },
          ],
          trend: [
            { week: "W1", resolved: 12, new: 15 },
            { week: "W2", resolved: 18, new: 11 },
            { week: "W3", resolved: 14, new: 19 },
            { week: "W4", resolved: 22, new: 16 },
          ],
        });
      });
  }, []);

  if (!data) return <PortalLayout><p className="text-sm text-muted-foreground">Loading…</p></PortalLayout>;

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Trends and insights across cases</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Cases & Referrals by Month</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data.monthly}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="cases" fill="hsl(234,56%,46%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="referrals" fill="hsl(234,56%,75%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Risk Distribution</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={data.riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {data.riskDistribution.map((_: any, i: number) => (
                      <Cell key={i} fill={RISK_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Weekly Resolution Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={data.trend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="resolved" stroke="hsl(152,60%,36%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="new" stroke="hsl(234,56%,46%)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
};

export default Analytics;
