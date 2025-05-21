"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Send, User, Users, Loader2, ArrowLeft, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase/supabase";
import { formatDistanceToNow } from "date-fns";
import BackButton from "@/components/dashboard/BackButton";

// Types
interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  status?: string;
  last_seen?: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender?: UserProfile;
}

interface Conversation {
  user: UserProfile;
  lastMessage?: Message;
  unreadCount: number;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch conversations on load
  useEffect(() => {
    if (!user) return;
    
    async function fetchConversations() {
      try {
        setLoading(true);
        
        // Get all sent and received messages to find conversation partners
        const { data: sentMessages, error: sentError } = await supabase
          .from('messages')
          .select('receiver_id')
          .eq('sender_id', user?.id || '')
          .order('created_at', { ascending: false });
          
        if (sentError) throw sentError;
        
        const { data: receivedMessages, error: receivedError } = await supabase
          .from('messages')
          .select('sender_id')
          .eq('receiver_id', user?.id || '')
          .order('created_at', { ascending: false });
          
        if (receivedError) throw receivedError;
        
        // Get unique conversation partners
        const userIds = new Set([
          ...(sentMessages?.map(msg => msg.receiver_id) || []),
          ...(receivedMessages?.map(msg => msg.sender_id) || [])
        ]);
        
        if (userIds.size === 0) {
          setLoading(false);
          return;
        }
        
        // Get user details for each conversation partner
        const { data: users, error: usersError } = await supabase
          .from('profiles')
          .select('id, email, full_name, avatar_url, status, last_seen')
          .in('id', Array.from(userIds));
          
        if (usersError) throw usersError;
        
        // Get last message for each conversation
        const conversationsWithLastMessage = await Promise.all((users || []).map(async (profileUser) => {
          // Get last message
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('*')
            .or(`sender_id.eq.${profileUser.id},receiver_id.eq.${profileUser.id}`)
            .order('created_at', { ascending: false })
            .limit(1);
            
          const lastMessage = lastMessageData?.[0];
          
          // Count unread messages
          const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('sender_id', profileUser.id)
            .eq('receiver_id', user?.id || '')
            .eq('read', false);
            
          return {
            user: profileUser,
            lastMessage,
            unreadCount: count || 0
          };
        }));
        
        // Sort by most recent message
        conversationsWithLastMessage.sort((a, b) => {
          if (!a.lastMessage) return 1;
          if (!b.lastMessage) return -1;
          return new Date(b.lastMessage.created_at).getTime() - 
                 new Date(a.lastMessage.created_at).getTime();
        });
        
        setConversations(conversationsWithLastMessage);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchConversations();
  }, [user]);
  
  // Scroll to bottom of messages when conversation changes or new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Search for users
  const handleSearch = async () => {
    if (!searchTerm.trim() || !user) return;
    
    try {
      setSearching(true);
      
      // Search by email or name
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, avatar_url, status')
        .or(`email.ilike.%${searchTerm}%,full_name.ilike.%${searchTerm}%`)
        .neq('id', user.id) // Don't include the current user
        .limit(10);
        
      if (error) throw error;
      
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearching(false);
    }
  };
  
  // Load messages for a conversation
  const loadMessages = async (otherUser: UserProfile) => {
    if (!user) return;
    
    try {
      setLoadingMessages(true);
      setSelectedConversation(otherUser);
      
      // Get all messages between current user and selected user
      const { data, error } = await supabase
        .from('messages')
        .select('*, sender:profiles!sender_id(id, full_name, avatar_url)')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUser.id}),and(sender_id.eq.${otherUser.id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      
      setMessages(data || []);
      
      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', otherUser.id)
        .eq('receiver_id', user.id)
        .eq('read', false);
        
      // Update unread count in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.user.id === otherUser.id 
            ? { ...conv, unreadCount: 0 } 
            : conv
        )
      );
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  };
  
  // Send a message
  const sendMessage = async () => {
    if (!messageText.trim() || !user || !selectedConversation) return;
    
    try {
      setSendingMessage(true);
      
      // Insert new message
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: selectedConversation.id,
          content: messageText.trim(),
          read: false
        })
        .select('*, sender:profiles!sender_id(id, full_name, avatar_url)');
        
      if (error) throw error;
      
      // Add message to current conversation
      if (data?.[0]) {
        setMessages(prev => [...prev, data[0]]);
      }
      
      // Update conversations list with new last message
      if (data?.[0]) {
        setConversations(prev => {
          const updatedConversations = prev.map(conv => 
            conv.user.id === selectedConversation.id 
              ? { ...conv, lastMessage: data[0] } 
              : conv
          );
          
          // If this is a new conversation, add it
          if (!updatedConversations.some(conv => conv.user.id === selectedConversation.id)) {
            updatedConversations.unshift({
              user: selectedConversation,
              lastMessage: data[0],
              unreadCount: 0
            });
          }
          
          return updatedConversations;
        });
      }
      
      // Clear message input
      setMessageText("");
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };
  
  // Start new conversation from search results
  const startConversation = (profileUser: UserProfile) => {
    setSelectedConversation(profileUser);
    setMessages([]);
    setSearchResults([]);
    setSearchTerm("");
    
    // Check if conversation already exists
    const existingConv = conversations.find(conv => conv.user.id === profileUser.id);
    if (!existingConv) {
      // Add to conversations list
      setConversations(prev => [
        { user: profileUser, unreadCount: 0 },
        ...prev
      ]);
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return "Unknown time";
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-gray-500 mt-1">
          Connect with instructors and other students
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="md:col-span-1">
          <Card className="h-[calc(100vh-240px)]">
            <CardHeader className="p-4">
              <CardTitle className="text-xl">Conversations</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-10 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <Button 
                variant="secondary" 
                className="mt-2 w-full" 
                onClick={handleSearch}
                disabled={searching || !searchTerm.trim()}
              >
                {searching ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Users className="mr-2 h-4 w-4" />
                )}
                Find Users
              </Button>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="border-b pb-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Search Results
                  </div>
                  <ScrollArea className="h-60">
                    {searchResults.map((profileUser) => (
                      <div 
                        key={profileUser.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => startConversation(profileUser)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profileUser.avatar_url || ""} />
                          <AvatarFallback>{getInitials(profileUser.full_name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {profileUser.full_name || profileUser.email}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {profileUser.email}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Message
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
              
              {/* Conversations */}
              <ScrollArea className={`h-[calc(100vh-350px)] ${searchResults.length > 0 ? 'h-[calc(100vh-450px)]' : ''}`}>
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : conversations.length > 0 ? (
                  conversations.map((conv) => (
                    <div 
                      key={conv.user.id}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        selectedConversation?.id === conv.user.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => loadMessages(conv.user)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conv.user.avatar_url || ""} />
                        <AvatarFallback>{getInitials(conv.user.full_name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="font-medium truncate">
                            {conv.user.full_name || conv.user.email}
                          </div>
                          {conv.lastMessage && (
                            <div className="text-xs text-muted-foreground">
                              {formatTime(conv.lastMessage.created_at)}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage?.content || "No messages yet"}
                        </div>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-primary">{conv.unreadCount}</Badge>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8">
                    <User className="h-10 w-10 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No conversations yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Search for users to start messaging
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Messages Area */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-240px)] flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <CardHeader className="p-4 border-b flex-shrink-0">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="mr-2 md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedConversation.avatar_url || ""} />
                      <AvatarFallback>{getInitials(selectedConversation.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">
                        {selectedConversation.full_name || selectedConversation.email}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.status || "Offline"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Messages Area */}
                <CardContent className="p-4 flex-grow overflow-auto">
                  {loadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Send className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                        Send your first message to start the conversation
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isSentByCurrentUser = message.sender_id === user?.id;
                        
                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex items-end gap-2 max-w-[80%]">
                              {!isSentByCurrentUser && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={message.sender?.avatar_url || ""} />
                                  <AvatarFallback>{getInitials(message.sender?.full_name)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`px-4 py-2 rounded-lg ${
                                  isSentByCurrentUser 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-secondary text-secondary-foreground'
                                }`}
                              >
                                <div className="break-words">{message.content}</div>
                                <div className={`text-xs mt-1 ${
                                  isSentByCurrentUser 
                                    ? 'text-primary-foreground/70' 
                                    : 'text-secondary-foreground/70'
                                }`}>
                                  {formatTime(message.created_at)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </CardContent>
                
                {/* Message Input */}
                <div className="p-4 border-t flex-shrink-0">
                  <form 
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                  >
                    <Input 
                      placeholder="Type a message..." 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      disabled={sendingMessage}
                    />
                    <Button 
                      type="submit" 
                      disabled={!messageText.trim() || sendingMessage}
                    >
                      {sendingMessage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Your Messages</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Select a conversation or search for users to start messaging
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Find Users to Message
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 