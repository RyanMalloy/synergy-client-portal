import { Card } from '@/components/ui';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | null;
  trendValue?: string;
  color?: 'blue' | 'green' | 'purple' | 'amber';
}

const colorMap = {
  blue: 'bg-soft-blue text-synergy-blue',
  green: 'bg-green-100 text-success',
  purple: 'bg-purple-100 text-accent-purple',
  amber: 'bg-amber-100 text-warning',
};

const trendColorMap = {
  up: 'text-success',
  down: 'text-error',
  null: 'text-gray-600',
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend = null,
  trendValue = '',
  color = 'blue',
}: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className={cn('w-10 h-10 flex items-center justify-center rounded-lg', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>

      {trend && trendValue && (
        <p className={cn('text-sm flex items-center gap-1', trendColorMap[trend])}>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{trendValue}</span>
        </p>
      )}
    </Card>
  );
}
