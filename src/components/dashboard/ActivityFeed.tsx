import { Card } from '@/components/ui';
import { format, parseISO } from 'date-fns';
import { Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'payment' | 'deployment' | 'ticket' | 'notification';
  title: string;
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const iconMap = {
  payment: DollarSign,
  deployment: CheckCircle,
  ticket: AlertCircle,
  notification: Clock,
};

const colorMap = {
  payment: 'text-success',
  deployment: 'text-synergy-blue',
  ticket: 'text-warning',
  notification: 'text-gray-400',
};

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-center text-gray-500">No recent activity</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          const iconColor = colorMap[activity.type];

          return (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {format(parseISO(activity.timestamp), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
