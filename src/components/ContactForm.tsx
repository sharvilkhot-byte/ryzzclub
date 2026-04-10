import { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  contactMethod: string;
  message: string;
  agreeToTerms: boolean;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      contactMethod: 'email',
      agreeToTerms: false
    }
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    if (!data.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form data:', data);
    toast.success('Thank you! Your message has been sent successfully.');
    reset();
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register('firstName', { 
                  required: 'First name is required',
                  minLength: { value: 2, message: 'First name must be at least 2 characters' }
                })}
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-destructive text-sm">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register('lastName', { 
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                })}
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {errors.lastName && (
                <p className="text-destructive text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              placeholder="Enter your email address"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone', {
                pattern: {
                  value: /^[\+]?[1-9][\d]{0,15}$/,
                  message: 'Please enter a valid phone number'
                }
              })}
              placeholder="Enter your phone number"
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label>Subject *</Label>
            <Select onValueChange={(value) => setValue('subject', value)}>
              <SelectTrigger className={errors.subject ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general"><span className="typeform-option-text">General Inquiry</span></SelectItem>
                <SelectItem value="support"><span className="typeform-option-text">Technical Support</span></SelectItem>
                <SelectItem value="sales"><span className="typeform-option-text">Sales Question</span></SelectItem>
                <SelectItem value="partnership"><span className="typeform-option-text">Partnership</span></SelectItem>
                <SelectItem value="other"><span className="typeform-option-text">Other</span></SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register('subject', { required: 'Please select a subject' })}
            />
            {errors.subject && (
              <p className="text-destructive text-sm">{errors.subject.message}</p>
            )}
          </div>

          {/* Preferred Contact Method */}
          <div className="space-y-3">
            <Label>Preferred Contact Method *</Label>
            <RadioGroup
              value={watchedValues.contactMethod}
              onValueChange={(value) => setValue('contactMethod', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="contact-email" />
                <Label htmlFor="contact-email"><span className="typeform-option-text">Email</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="contact-phone" />
                <Label htmlFor="contact-phone"><span className="typeform-option-text">Phone</span></Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="contact-both" />
                <Label htmlFor="contact-both"><span className="typeform-option-text">Either email or phone</span></Label>
              </div>
            </RadioGroup>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters' }
              })}
              placeholder="Enter your message here..."
              rows={5}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-destructive text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={watchedValues.agreeToTerms}
              onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
            />
            <Label htmlFor="agreeToTerms" className="text-sm leading-5">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                terms and conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                privacy policy
              </a>
              . *
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-destructive text-sm">You must agree to the terms and conditions</p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}