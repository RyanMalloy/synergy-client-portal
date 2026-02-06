'use client';

import { Card, StatusBadge, Button } from '@/components/ui';
import { Calendar, ExternalLink } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  status: 'active' | 'pending' | 'inactive' | 'completed';
  renewDate?: string;
  price?: string;
  description?: string;
  onManage?: () => void;
}

export default function ServiceCard({
  title,
  status,
  renewDate,
  price,
  description,
  onManage,
}: ServiceCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="space-y-3 mt-4">
        {price && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Price</span>
            <span className="font-semibold text-gray-900">{price}</span>
          </div>
        )}

        {renewDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Renews: {renewDate}</span>
          </div>
        )}
      </div>

      {onManage && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onManage}
          className="w-full mt-4 justify-center gap-2"
        >
          Manage Service
          <ExternalLink className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );
}
