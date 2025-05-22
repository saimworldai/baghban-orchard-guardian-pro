
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, CheckCircle } from "lucide-react";
import { StatusBadge } from './StatusBadge';
import { Consultation } from '@/types/consultations';

interface ConsultationTableProps {
  consultations: Consultation[];
  onAccept?: (id: string) => void;
  onStartCall?: (id: string) => void;
  onComplete?: (id: string) => void;
  isPending?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function ConsultationTable({ 
  consultations, 
  onAccept, 
  onStartCall, 
  onComplete,
  isPending,
  isActive,
  isCompleted
}: ConsultationTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>{isCompleted ? 'Created' : 'Scheduled'}</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>
                    {consultation.farmer?.email || "Unknown Farmer"}
                  </TableCell>
                  <TableCell>{consultation.topic}</TableCell>
                  <TableCell>
                    <StatusBadge status={consultation.status} />
                  </TableCell>
                  <TableCell>
                    {isCompleted 
                      ? new Date(consultation.created_at).toLocaleDateString()
                      : consultation.scheduled_for 
                        ? new Date(consultation.scheduled_for).toLocaleDateString() + ' ' + 
                          new Date(consultation.scheduled_for).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : 'Not scheduled'
                    }
                  </TableCell>
                  <TableCell>
                    {isPending && onAccept && (
                      <Button
                        size="sm"
                        onClick={() => onAccept(consultation.id)}
                      >
                        Accept
                      </Button>
                    )}
                    {isActive && (
                      <div className="flex gap-2">
                        {onStartCall && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => onStartCall(consultation.id)}
                          >
                            <Video className="h-4 w-4 mr-1" /> Join Call
                          </Button>
                        )}
                        {onComplete && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onComplete(consultation.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Complete
                          </Button>
                        )}
                      </div>
                    )}
                    {isCompleted && (
                      <Button size="sm" variant="outline">
                        View Report
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No consultations available in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
