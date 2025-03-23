
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import { TestTube } from "lucide-react";

// Define the chart configuration
const chartConfig = {
  hemoglobin: {
    label: "Hemoglobin",
    color: "#8B5CF6" // Vivid purple
  },
  normal: {
    label: "Normal Range",
    theme: {
      light: "#E5DEFF", // Soft purple
      dark: "#6E59A5" // Tertiary purple
    }
  }
};

// Define normal range for hemoglobin levels
const HEMOGLOBIN_MIN = 12.0; // g/dL
const HEMOGLOBIN_MAX = 15.5; // g/dL

interface HemoglobinChartProps {
  observations: any[];
  className?: string;
}

const HemoglobinChart: React.FC<HemoglobinChartProps> = ({ observations, className }) => {
  // Filter for hemoglobin observations and map to chart data format
  const chartData = observations
    // Filter for hemoglobin observations (LOINC code 718-7)
    .filter(obs => {
      const coding = obs.code?.coding || [];
      return coding.some((code: any) => 
        code.code === "718-7" || 
        code.display?.toLowerCase().includes("hemoglobin") ||
        obs.code?.text?.toLowerCase().includes("hemoglobin")
      );
    })
    // Convert to chart data format
    .map(obs => {
      const value = obs.valueQuantity?.value || 0;
      return {
        date: obs.effectiveDateTime,
        formattedDate: formatDate(obs.effectiveDateTime),
        value: parseFloat(value),
        status: getStatusFromValue(parseFloat(value))
      };
    })
    // Sort by date
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Determine status based on value
  function getStatusFromValue(value: number): string {
    if (value < HEMOGLOBIN_MIN) return "Low";
    if (value > HEMOGLOBIN_MAX) return "High";
    return "Normal";
  }

  if (chartData.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-md font-medium">Hemoglobin in Blood</CardTitle>
          <TestTube className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
            <p>No hemoglobin data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate min and max values for chart display with some padding
  const minValue = Math.floor(Math.min(...chartData.map(d => d.value)) - 1);
  const maxValue = Math.ceil(Math.max(...chartData.map(d => d.value)) + 1);
  
  // Format the tooltip display
  const formatTooltip = (value: number) => {
    return `${value.toFixed(1)} g/dL`;
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-md font-medium">Hemoglobin in Blood</CardTitle>
        <TestTube className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="formattedDate" 
                  tickMargin={10}
                  tickFormatter={(value) => {
                    // Just get the date part (not time)
                    return value.split(",")[0];
                  }}
                />
                <YAxis 
                  domain={[minValue, maxValue]} 
                  tickFormatter={(value) => `${value}`}
                />
                
                {/* Reference lines for normal range */}
                <ReferenceLine 
                  y={HEMOGLOBIN_MIN} 
                  stroke="#9b87f5" 
                  strokeDasharray="3 3" 
                  strokeWidth={1.5} 
                />
                <ReferenceLine 
                  y={HEMOGLOBIN_MAX} 
                  stroke="#9b87f5" 
                  strokeDasharray="3 3" 
                  strokeWidth={1.5} 
                />
                
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  fill="url(#hemoglobinGradient)"
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: "#7E69AB", strokeWidth: 2, fill: "#8B5CF6" }}
                />
                
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="font-medium">Value:</div>
                            <div>{formatTooltip(data.value)}</div>
                            <div className="font-medium">Status:</div>
                            <div>{data.status}</div>
                            <div className="font-medium">Date:</div>
                            <div>{data.formattedDate}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="hemoglobinGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-[#8B5CF6] mr-1"></span>
              Hemoglobin Level
            </span>
            <span>•</span>
            <span className="flex items-center">
              <span className="h-1 w-3 border-t border-dashed border-[#9b87f5] mr-1"></span>
              Normal Range ({HEMOGLOBIN_MIN}-{HEMOGLOBIN_MAX} g/dL)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HemoglobinChart;
