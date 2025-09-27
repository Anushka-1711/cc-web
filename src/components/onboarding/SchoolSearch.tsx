import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Check } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface School {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  type: 'university' | 'college' | 'school';
}

interface SchoolSearchProps {
  selectedSchool: School | null;
  onSelectSchool: (school: School) => void;
}

// Mock data for schools/universities
const mockSchools: School[] = [
  { id: '1', name: 'Lovely Professional University', location: 'Phagwara, Punjab, India', city: 'Phagwara', state: 'Punjab', country: 'India', type: 'university' },
  { id: '2', name: 'Delhi University', location: 'Delhi, India', city: 'Delhi', state: 'Delhi', country: 'India', type: 'university' },
  { id: '3', name: 'Mumbai University', location: 'Mumbai, Maharashtra, India', city: 'Mumbai', state: 'Maharashtra', country: 'India', type: 'university' },
  { id: '4', name: 'IIT Delhi', location: 'New Delhi, India', city: 'New Delhi', state: 'Delhi', country: 'India', type: 'university' },
  { id: '5', name: 'IIT Bombay', location: 'Mumbai, Maharashtra, India', city: 'Mumbai', state: 'Maharashtra', country: 'India', type: 'university' },
  { id: '6', name: 'BITS Pilani', location: 'Pilani, Rajasthan, India', city: 'Pilani', state: 'Rajasthan', country: 'India', type: 'university' },
  { id: '7', name: 'Chandigarh University', location: 'Mohali, Punjab, India', city: 'Mohali', state: 'Punjab', country: 'India', type: 'university' },
  { id: '8', name: 'Amity University', location: 'Noida, Uttar Pradesh, India', city: 'Noida', state: 'Uttar Pradesh', country: 'India', type: 'university' },
  { id: '9', name: 'Manipal University', location: 'Manipal, Karnataka, India', city: 'Manipal', state: 'Karnataka', country: 'India', type: 'university' },
  { id: '10', name: 'VIT University', location: 'Vellore, Tamil Nadu, India', city: 'Vellore', state: 'Tamil Nadu', country: 'India', type: 'university' }
];

export function SchoolSearch({ selectedSchool, onSelectSchool }: SchoolSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'location'>('name');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique locations for filter
  const locations = useMemo(() => {
    const uniqueStates = [...new Set(mockSchools.map(school => school.state))];
    return uniqueStates.sort();
  }, []);

  // Filter and sort schools
  const filteredSchools = useMemo(() => {
    try {
      let filtered = mockSchools.filter(school => {
        const matchesQuery = searchQuery === '' || 
          school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          school.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = locationFilter === 'all' || school.state === locationFilter;
        return matchesQuery && matchesLocation;
      });

      // Sort results
      filtered.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else {
          return a.location.localeCompare(b.location);
        }
      });

      return filtered;
    } catch (error) {
      console.error('Error filtering schools:', error);
      return mockSchools.slice(0, 5); // Return first 5 schools as fallback
    }
  }, [searchQuery, locationFilter, sortBy]);

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 bg-card border-b border-border">
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for your school, university, or college…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-input-background border-border rounded-xl"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-8 px-3 rounded-full border-border"
          >
            <Filter size={14} className="mr-1" />
            Filters
          </Button>
          
          {locationFilter !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-8 px-3 rounded-full cursor-pointer hover:bg-secondary/80"
              onClick={() => setLocationFilter('all')}
            >
              {locationFilter} ×
            </Badge>
          )}

          <Badge 
            variant="outline" 
            className="h-8 px-3 rounded-full cursor-pointer hover:bg-accent"
            onClick={() => setSortBy(sortBy === 'name' ? 'location' : 'name')}
          >
            Sort: {sortBy === 'name' ? 'A-Z' : 'Location'}
          </Badge>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={locationFilter === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setLocationFilter('all')}
                >
                  All Locations
                </Badge>
                {locations.slice(0, 6).map((location) => (
                  <Badge
                    key={location}
                    variant={locationFilter === location ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setLocationFilter(location)}
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredSchools.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No schools found</h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchools.map((school) => (
              <button
                key={school.id}
                onClick={() => onSelectSchool(school)}
                className={`w-full p-4 rounded-xl border transition-all text-left hover:shadow-md ${
                  selectedSchool?.id === school.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card hover:border-border/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{school.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      <span>{school.location}</span>
                    </div>
                  </div>
                  {selectedSchool?.id === school.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom School Option */}
      <div className="p-4 border-t border-border bg-card">
        <button
          onClick={() => onSelectSchool({
            id: 'custom',
            name: 'Other Institution',
            location: 'Not listed',
            city: '',
            state: '',
            country: '',
            type: 'school'
          })}
          className={`w-full p-4 rounded-xl border transition-all text-left ${
            selectedSchool?.id === 'custom'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-background hover:bg-accent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">My school isn't listed</h3>
              <p className="text-sm text-muted-foreground">Add your institution manually</p>
            </div>
            {selectedSchool?.id === 'custom' && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check size={14} className="text-primary-foreground" />
              </div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}