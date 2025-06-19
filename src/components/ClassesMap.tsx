"use client"

import React, { useEffect, useRef } from 'react'
import { MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { Class } from '@/lib/supabase/classesUtils'

interface ClassesMapProps {
  classes: Class[]
  onClose: () => void
}

// Cache for geocoded addresses to avoid repeated API calls
const geocodeCache = new Map<string, { lat: number; lng: number }>()

// Function to geocode address using Nominatim (OpenStreetMap's free geocoding service)
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  // Check cache first
  if (geocodeCache.has(address)) {
    return geocodeCache.get(address)!
  }
  
  try {
    // Clean up the address for better geocoding results
    const cleanAddress = address.trim()
    
    // Use Nominatim API (free, no API key required)
    const encodedAddress = encodeURIComponent(cleanAddress)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&countrycodes=us`,
      {
        headers: {
          'User-Agent': 'StudioE-DanceClasses/1.0' // Required by Nominatim
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    
    if (data && data.length > 0) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      }
      
      // Cache the result
      geocodeCache.set(address, coords)
      return coords
    }
  } catch (error) {
    console.warn('Geocoding failed for address:', address, error)
  }
  
  // Fallback to Chicago center if geocoding fails
  const fallback = { lat: 41.8781, lng: -87.6298 }
  geocodeCache.set(address, fallback)
  return fallback
}

// Group classes by studio location (async to handle geocoding)
const groupClassesByLocation = async (classes: Class[]) => {
  const locationGroups: Record<string, { 
    company: Class['company']
    classes: Class[]
    coordinates: { lat: number; lng: number }
  }> = {}

  // First pass: group classes by company
  classes.forEach(classItem => {
    const key = `${classItem.company?.id || classItem.id}-${classItem.company?.name || 'Unknown'}`
    
    if (!locationGroups[key]) {
      locationGroups[key] = {
        company: classItem.company,
        classes: [],
        coordinates: { lat: 41.8781, lng: -87.6298 } // Temporary coordinates
      }
    }
    
    locationGroups[key].classes.push(classItem)
  })

  // Second pass: geocode addresses with rate limiting
  const groups = Object.values(locationGroups)
  
  // Process geocoding with a smaller delay to balance speed and respect for API limits
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    if (group.company?.address) {
      try {
        group.coordinates = await geocodeAddress(group.company.address)
        // Small delay to respect Nominatim's usage policy (reduced to 300ms for better UX)
        if (i < groups.length - 1) { // Don't delay after the last request
          await new Promise(resolve => setTimeout(resolve, 300))
        }
      } catch (error) {
        console.warn('Failed to geocode address:', group.company.address, error)
        // Keep default coordinates
      }
    }
  }

  return groups
}

export default function ClassesMap({ classes, onClose }: ClassesMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isLoadingLocations, setIsLoadingLocations] = React.useState(true)

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initializeMap = async () => {
      if (typeof window === 'undefined') return

      const L = (await import('leaflet')).default

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      if (mapRef.current && !mapInstanceRef.current) {
        try {
          // Initialize map centered on Chicago
          mapInstanceRef.current = L.map(mapRef.current).setView([41.8781, -87.6298], 11)

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstanceRef.current)

          // Group classes by location and add markers
          setIsLoadingLocations(true)
          const locationGroups = await groupClassesByLocation(classes)
          setIsLoadingLocations(false)
          
          // Ensure map instance still exists before adding markers
          if (mapInstanceRef.current) {
            locationGroups.forEach(group => {
              // Create custom icon with class count
              const classCount = group.classes.length
              const customIcon = L.divIcon({
                className: 'custom-map-marker',
                html: `
                  <div class="bg-[#EC407A] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                    ${classCount}
                  </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              })

              // Create marker - double check map instance exists
              if (mapInstanceRef.current) {
                const marker = L.marker([group.coordinates.lat, group.coordinates.lng], {
                  icon: customIcon
                }).addTo(mapInstanceRef.current)

                // Create popup content
                const popupContent = `
                  <div class="p-2 min-w-[280px]">
                    <div class="font-bold text-lg mb-2 text-[#EC407A]">${group.company?.name || 'Unknown Studio'}</div>
                    <div class="text-sm text-gray-600 mb-3">${group.company?.address?.split(',')[0] || 'Chicago'}</div>
                    <div class="space-y-2 max-h-48 overflow-y-auto">
                      ${group.classes.slice(0, 5).map(classItem => `
                        <div class="border-l-2 border-[#EC407A] pl-2 py-1">
                          <div class="font-medium text-sm">${classItem.class_name}</div>
                          <div class="text-xs text-gray-600">
                            ${format(new Date(classItem.class_date), 'MMM d')} • 
                            ${classItem.start_time} • 
                            $${classItem.price}
                          </div>
                        </div>
                      `).join('')}
                      ${group.classes.length > 5 ? `
                        <div class="text-xs text-gray-500 text-center pt-1">
                          +${group.classes.length - 5} more classes
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `

                marker.bindPopup(popupContent, {
                  maxWidth: 300,
                  className: 'custom-popup'
                })

                markersRef.current.push(marker)
              }
            })
          }
        } catch (error) {
          console.error('Error initializing map:', error)
          setIsLoadingLocations(false)
        }
      }
    }

    initializeMap()

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      markersRef.current = []
    }
  }, [classes])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Class Locations Map</h2>
            <p className="text-sm text-gray-600">{classes.length} classes across Chicago</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <div 
            ref={mapRef} 
            className="w-full h-full"
            style={{ minHeight: '400px' }}
          />
          
          {/* Loading Overlay */}
          {isLoadingLocations && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#EC407A] border-t-transparent"></div>
                <div className="text-sm text-gray-600">Loading studio locations...</div>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
            <div className="text-sm font-medium mb-2">Legend</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="bg-[#EC407A] text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                #
              </div>
              <span>Number of classes at studio</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>Click markers to see class details</div>
            <div>Powered by OpenStreetMap</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-map-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 0;
          font-family: inherit;
        }
        
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}</style>
    </div>
  )
} 