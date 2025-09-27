import { useState } from 'react';
import { ArrowLeft, ChevronRight, Shield, Users, MessageCircle, Heart, GraduationCap, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SchoolSearch } from './SchoolSearch';

interface OnboardingProps {
  onComplete: () => void;
}

interface School {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  country: string;
  type: 'university' | 'college' | 'school';
}

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Confess",
    subtitle: "Your safe space for anonymous sharing",
    icon: "🎭",
    description: "Connect with your university community through anonymous confessions, secrets, and conversations. Share what's on your mind without judgment.",
    features: [
      { icon: Shield, text: "Complete anonymity guaranteed" },
      { icon: Users, text: "University-specific communities" },
      { icon: MessageCircle, text: "Private anonymous messaging" }
    ]
  },
  {
    id: 2,
    title: "Find Your Community",
    subtitle: "Select your school or university",
    icon: "🎓",
    description: "Join your university's community to see relevant confessions and connect with fellow students.",
    isSchoolSearch: true
  },
  {
    id: 3,
    title: "You're All Set!",
    subtitle: "Ready to start sharing",
    icon: "🚀",
    description: "Your anonymous profile is ready. Start exploring confessions, join conversations, and share your thoughts with your community.",
    features: [
      { icon: Heart, text: "React to posts with emojis" },
      { icon: MessageCircle, text: "Comment anonymously" },
      { icon: Users, text: "Join topic-based communities" }
    ]
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleting(true);
      // Save selected school to localStorage
      try {
        if (selectedSchool) {
          localStorage.setItem('selectedSchool', JSON.stringify(selectedSchool));
        }
      } catch (error) {
        console.error('Error saving school to localStorage:', error);
      }
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) { // School selection step
      return selectedSchool !== null;
    }
    return true;
  };

  const step = onboardingSteps[currentStep];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentStep === 0
              ? 'text-muted-foreground cursor-not-allowed'
              : 'text-foreground hover:bg-accent'
          }`}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        {/* Progress Indicators */}
        <div className="flex items-center gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Step Counter */}
        <div className="text-sm text-muted-foreground font-medium">
          {currentStep + 1} of {onboardingSteps.length}
        </div>
      </div>

      {/* Content */}
      {step.isSchoolSearch ? (
        /* School Search Step */
        <div className="flex-1 flex flex-col">
          <div className="p-6 bg-card border-b border-border">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{step.icon}</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">{step.title}</h1>
              <p className="text-muted-foreground">{step.subtitle}</p>
            </div>
          </div>
          
          <div className="flex-1">
            <SchoolSearch 
              selectedSchool={selectedSchool}
              onSelectSchool={setSelectedSchool}
            />
          </div>
        </div>
      ) : (
        /* Regular Steps */
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="max-w-sm mx-auto w-full text-center">
            {/* Icon */}
            <div className="text-6xl mb-8">{step.icon}</div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-2">{step.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{step.subtitle}</p>

            {/* Description */}
            <p className="text-foreground leading-relaxed mb-8 text-left">
              {step.description}
            </p>

            {/* Features */}
            {step.features && (
              <div className="space-y-4 mb-12">
                {step.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon size={20} className="text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-left">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Selected School Display (for confirmation step) */}
            {currentStep === 2 && selectedSchool && (
              <div className="mb-8">
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={20} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-primary mb-1">{selectedSchool.name}</p>
                      <p className="text-sm text-primary/80">{selectedSchool.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-6 bg-card border-t border-border">
        <div className="max-w-sm mx-auto">
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isCompleting}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl"
          >
            {isCompleting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up your profile...
              </div>
            ) : currentStep === onboardingSteps.length - 1 ? (
              <div className="flex items-center gap-2">
                <Check size={18} />
                Get Started
              </div>
            ) : currentStep === 1 ? (
              selectedSchool ? (
                <div className="flex items-center gap-2">
                  Continue with {selectedSchool.name.length > 20 ? selectedSchool.name.substring(0, 20) + '...' : selectedSchool.name}
                  <ChevronRight size={18} />
                </div>
              ) : (
                'Select your school to continue'
              )
            ) : (
              <div className="flex items-center gap-2">
                Continue
                <ChevronRight size={18} />
              </div>
            )}
          </Button>

          {/* Additional info for school selection */}
          {currentStep === 1 && (
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This helps us show you relevant content from your university community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}