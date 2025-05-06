"use client";

import React, { useState } from 'react';
import { CalendarPlus, ChevronDown, Check, Copy } from "lucide-react";

type SubscribeToCalendarProps = {
  feedType: 'events' | 'classes';
  buttonVariant?: string;
  buttonSize?: string;
  showIcon?: boolean;
  className?: string;
};

const SubscribeToCalendar = ({
  feedType = 'events',
  buttonVariant = 'default',
  showIcon = true,
  className = '',
}: SubscribeToCalendarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Always use production URL regardless of environment
  const baseUrl = "https://www.joinstudioe.com";
  
  // Get proper calendar name
  const calendarName = feedType === 'events' ? 'Studio E Dance Events' : 'Studio E Dance Classes';
  
  // For Google Calendar, we need to use https:// protocol
  const httpFeedUrl = `https://www.joinstudioe.com/api/calendar/${feedType}`;
  
  // For Apple Calendar and general .ics downloads, webcal:// protocol is preferred
  const webcalFeedUrl = `webcal://www.joinstudioe.com/api/calendar/${feedType}`;
  
  // Google Calendar direct integration URL - uses the calendar/render endpoint
  // This will directly prompt to add the calendar instead of going to settings
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalFeedUrl)}`;
  
  // Outlook Web uses normal HTTP URL
  const outlookCalendarUrl = `https://outlook.office.com/calendar/0/addfromweb?url=${encodeURIComponent(httpFeedUrl)}&name=${encodeURIComponent(calendarName)}`;
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  // Open calendar-specific instructional modal for Apple/other calendars
  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };
  
  // Copy the calendar URL to clipboard
  const copyFeedUrl = () => {
    navigator.clipboard.writeText(webcalFeedUrl);
    setCopied(true);
    
    // Show copied status for 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getButtonClass = () => {
    let baseClass = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium";
    
    if (buttonVariant === 'outline') {
      baseClass += " border border-white text-white hover:bg-white/20";
    } else if (buttonVariant === 'subtle') {
      baseClass += " bg-gray-100 text-gray-900 hover:bg-gray-200";
    } else {
      baseClass += " bg-primary text-white hover:bg-primary/90";
    }
    
    return `${baseClass} ${className}`;
  };

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={getButtonClass()}
        onBlur={() => setTimeout(closeDropdown, 100)}
      >
        {showIcon && <CalendarPlus className="mr-2 h-4 w-4" />}
        Subscribe to Calendar
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 right-0 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeDropdown}
            >
              Google Calendar
            </a>
            <a
              href={outlookCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={closeDropdown}
            >
              Outlook Calendar
            </a>
            <button
              onClick={openModal}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Apple Calendar / Other
            </button>
          </div>
        </div>
      )}

      {/* Modal for Apple Calendar instructions */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Subscribe to {calendarName}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Copy this URL to subscribe in your calendar application.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex-1 p-3 bg-gray-100 rounded text-sm break-all">
                {webcalFeedUrl}
              </div>
              <button
                onClick={copyFeedUrl}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Instructions:</h4>
              <div className="space-y-2">
                <p className="text-sm"><strong>Apple Calendar:</strong> Go to File → New Calendar Subscription, paste the URL above, and follow the prompts.</p>
                <p className="text-sm"><strong>Other Calendar Apps:</strong> Look for an option like "Subscribe to Calendar" or "Add Calendar" and enter the URL above when prompted.</p>
                <p className="text-sm"><strong>Direct Download:</strong> You can also <a href={httpFeedUrl} className="text-blue-500 hover:underline">download the calendar file</a> and import it manually.</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribeToCalendar; 