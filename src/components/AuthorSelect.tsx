"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { BlogAuthor, getBlogAuthors, createBlogAuthor } from '@/lib/blog/blogUtils';
import SupabaseImageUploader from '@/components/SupabaseImageUploader';
import { toast } from 'sonner';

interface AuthorSelectProps {
  value: string;
  onChange: (value: string, authorData?: BlogAuthor) => void;
}

export function AuthorSelect({ value, onChange }: AuthorSelectProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [authorSelectOpen, setAuthorSelectOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({
    name: '',
    bio: '',
    email: '',
    profile_image: '',
  });

  // Load authors on mount
  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    setLoading(true);
    try {
      const fetchedAuthors = await getBlogAuthors();
      setAuthors(fetchedAuthors);
    } catch (error) {
      console.error('Error loading authors:', error);
      toast.error('Failed to load authors');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorSelect = (authorId: string) => {
    const selectedAuthor = authors.find(author => author.id === authorId);
    onChange(authorId, selectedAuthor);
    setAuthorSelectOpen(false);
  };

  const handleNewAuthorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAuthor(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageUpload = (url: string) => {
    setNewAuthor(prev => ({ ...prev, profile_image: url }));
  };

  const handleCreateAuthor = async () => {
    if (!newAuthor.name.trim()) {
      toast.error('Author name is required');
      return;
    }

    setLoading(true);
    try {
      const result = await createBlogAuthor({
        name: newAuthor.name.trim(),
        bio: newAuthor.bio,
        email: newAuthor.email,
        profile_image: newAuthor.profile_image,
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to create author');
      }

      // Add the new author to the list and select it
      setAuthors(prev => [...prev, result.data]);
      onChange(result.data.id, result.data);

      // Reset form and close dialog
      setNewAuthor({ name: '', bio: '', email: '', profile_image: '' });
      setDialogOpen(false);
      toast.success('Author created successfully');
    } catch (error) {
      console.error('Error creating author:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create author');
    } finally {
      setLoading(false);
    }
  };

  // Get the currently selected author
  const selectedAuthor = authors.find(author => author.id === value);

  return (
    <div className="space-y-2">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="relative">
          <Button
            variant="outline"
            type="button"
            className="w-full flex justify-between items-center"
            onClick={() => setAuthorSelectOpen(!authorSelectOpen)}
          >
            {selectedAuthor ? (
              <div className="flex items-center gap-2">
                {selectedAuthor.profile_image ? (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={selectedAuthor.profile_image}
                      alt={selectedAuthor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <User className="h-5 w-5 text-gray-400" />
                )}
                <span>{selectedAuthor.name}</span>
              </div>
            ) : (
              "Select an author"
            )}
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
          
          {/* Simple dropdown menu */}
          {authorSelectOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
              <div className="py-1 max-h-60 overflow-auto">
                {loading ? (
                  <div className="px-4 py-2 text-sm text-gray-500">Loading authors...</div>
                ) : authors.length > 0 ? (
                  <>
                    {authors.map((author) => (
                      <div
                        key={author.id}
                        className={cn(
                          "px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100",
                          author.id === value && "bg-gray-50"
                        )}
                        onClick={() => handleAuthorSelect(author.id)}
                      >
                        {author.profile_image ? (
                          <div className="relative h-6 w-6 overflow-hidden rounded-full flex-shrink-0">
                            <Image
                              src={author.profile_image}
                              alt={author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <User className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="flex-grow">{author.name}</span>
                        {author.id === value && (
                          <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No authors found</div>
                )}
                <div className="border-t border-gray-100 mt-1">
                  <DialogTrigger asChild>
                    <div 
                      className="px-4 py-2 text-sm text-blue-600 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setAuthorSelectOpen(false);
                        setDialogOpen(true);
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add new author</span>
                    </div>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Author</DialogTitle>
            <DialogDescription>
              Create a new author profile. This information will be used for all blog posts by this author.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={newAuthor.name}
                onChange={handleNewAuthorChange}
                placeholder="Author's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newAuthor.email}
                onChange={handleNewAuthorChange}
                placeholder="author@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={newAuthor.bio}
                onChange={handleNewAuthorChange}
                placeholder="Brief author bio"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile_image">Profile Image</Label>
              <SupabaseImageUploader
                bucket="profile_images"
                folder="authors"
                onUploadComplete={handleProfileImageUpload}
                acceptedFileTypes="image/jpeg, image/png, image/webp"
                maxFileSizeMB={1}
              />
              {newAuthor.profile_image && (
                <div className="mt-2">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={newAuthor.profile_image}
                      alt="Author profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleCreateAuthor}
              disabled={loading || !newAuthor.name.trim()}
            >
              {loading ? "Creating..." : "Create Author"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 