import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CalendarPlus, Copy, Check, Calendar, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type SubscribeToCalendarProps = {
  feedType: 'events' | 'classes'; // Type of calendar feed
  buttonVariant?: 'default' | 'outline' | 'subtle'; // Button style
  buttonSize?: 'default' | 'sm' | 'lg'; // Button size
  showIcon?: boolean; // Whether to show the calendar icon
  className?: string; // Additional CSS classes
};

const SubscribeToCalendar = ({
  feedType = 'events',
  buttonVariant = 'default',
  buttonSize = 'default',
  showIcon = true,
  className = '',
}: SubscribeToCalendarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Base URL for the API endpoint that will generate the iCalendar feed
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const feedUrl = `${baseUrl}/api/calendar/${feedType}`;

  // URLs for direct subscription in different calendar applications
  const googleCalendarUrl = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(feedUrl)}`;
  const outlookCalendarUrl = `https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(feedUrl)}&name=${encodeURIComponent(`Studio E ${feedType === 'events' ? 'Events' : 'Classes'}`)}`;
  // Apple Calendar doesn't have a direct web URL for subscription - users need to use the feed URL

  const copyFeedUrl = () => {
    navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    toast.success("Calendar feed URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={buttonVariant as any} 
            size={buttonSize as any}
            className={className}
          >
            {showIcon && <CalendarPlus className="mr-2 h-4 w-4" />}
            Subscribe to Calendar
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => window.open(googleCalendarUrl, '_blank')}>
            Google Calendar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open(outlookCalendarUrl, '_blank')}>
            Outlook Calendar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Apple Calendar / Other
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to Calendar</DialogTitle>
            <DialogDescription>
              Copy this URL to subscribe in your calendar application.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 p-3 bg-gray-100 rounded text-sm break-all">
              {feedUrl}
            </div>
            <Button size="icon" onClick={copyFeedUrl}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Instructions:</h4>
            <div className="space-y-2">
              <p className="text-sm"><strong>Apple Calendar:</strong> Go to File → New Calendar Subscription, paste the URL above, and follow the prompts.</p>
              <p className="text-sm"><strong>Other Calendar Apps:</strong> Look for an option like "Subscribe to Calendar" or "Add Calendar" and enter the URL above when prompted.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeToCalendar; 