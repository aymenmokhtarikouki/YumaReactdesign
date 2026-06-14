import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  X, 
  ChevronRight, 
  Minus, 
  Plus, 
  Calendar, 
  MapPin, 
  Camera,
  Check,
  ChevronLeft,
  AlertCircle,
  Cake,
  Clock,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import * as SliderPrimitive from "@radix-ui/react-slider";

// Modular UI Components
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { cn } from '../components/ui/utils';

export default function CakeInquiry() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: 'Money Cake Celebration',
    eventType: 'Birthday',
    guests: 30,
    readyBy: 'Mar 30, 2025 · 6:00 PM',
    delivery: true,
    address: 'Al Zahiyah, Abu Dhabi',
    size: '2-Tier (Serves 30–40)',
    sponge: 'Vanilla',
    filling: 'Pistachio Cream',
    colors: ['White', 'Gold', 'Blush'],
    brief: 'Modern white cake with gold accents, soft florals, and a money reveal in the center. Vanilla sponge with pistachio cream. Should feel elegant but still playful for a family birthday dinner.',
    cakeMessage: 'Happy 30th, Yara!',
    allergens: ['Gluten', 'Dairy', 'Eggs', 'Tree nuts'],
    budgetMin: 120,
    budgetMax: 180,
    specialInstructions: ''
  });

  const eventTypes = ['Birthday', 'Wedding', 'Baby Shower', 'Engagement', 'Corporate', 'Other'];
  
  const sizes = [
    { label: '6 inch (Serves 8–10)', price: 'Included' },
    { label: '8 inch (Serves 15–20)', price: '+$20' },
    { label: '2-Tier (Serves 30–40)', price: '+$65' },
    { label: '3-Tier Wedding (Serves 60–70)', price: '+$130' }
  ];

  const sponges = ['Vanilla', 'Rich Chocolate', 'Red Velvet', 'Lemon', 'Pistachio', 'Carrot'];
  const fillings = ['Pistachio Cream', 'Chocolate Ganache', 'Cream Cheese', 'Rosewater Drizzle', 'Fresh Berries & Cream', 'Salted Caramel'];
  const allAllergens = ['Gluten', 'Dairy', 'Eggs', 'Tree nuts', 'Peanuts', 'Sesame'];

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, item: string) => {
    setFormData(prev => {
      const arr = [...(prev as any)[field]];
      const index = arr.indexOf(item);
      if (index > -1) arr.splice(index, 1);
      else arr.push(item);
      return { ...prev, [field]: arr };
    });
  };

  const SectionHeader = ({ title, required = false, optional = false }: { title: string, required?: boolean, optional?: boolean }) => (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[18px] font-bold text-gray-900 tracking-tight">{title}</h3>
      {required && (
        <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-100 border-none px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">Required</Badge>
      )}
      {optional && (
        <Badge variant="outline" className="text-gray-400 border-gray-100 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">Optional</Badge>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Inquiry Title */}
      <section>
        <SectionHeader title="Inquiry Title" required />
        <Input 
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="h-14 bg-gray-50 border-transparent rounded-2xl px-5 text-[15px] font-medium focus-visible:ring-gray-900 focus-visible:bg-white transition-all shadow-none"
          placeholder="e.g., Birthday Celebration"
        />
      </section>

      {/* Event Type */}
      <section>
        <SectionHeader title="Event Type" required />
        <div className="flex flex-wrap gap-2">
          {eventTypes.map(type => (
            <Button
              key={type}
              variant={formData.eventType === type ? "default" : "outline"}
              onClick={() => updateField('eventType', type)}
              className={`h-11 px-5 rounded-2xl text-[14px] font-bold transition-all ${
                formData.eventType === type 
                  ? 'bg-gray-900 text-white' 
                  : 'border-2 border-gray-100 bg-white text-gray-600 hover:border-gray-200'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </section>

      {/* Number of Guests */}
      <section>
        <SectionHeader title="Number of Guests" required />
        <div className="flex items-center justify-between border-2 border-gray-100 rounded-3xl overflow-hidden bg-white">
          <button 
            onClick={() => updateField('guests', Math.max(1, formData.guests - 1))}
            className="w-20 h-20 flex items-center justify-center text-gray-900 border-r-2 border-gray-100 active:bg-gray-50 transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center py-4">
            <span className="text-[32px] font-black text-gray-900 leading-none">{formData.guests}</span>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">guests</p>
          </div>
          <button 
            onClick={() => updateField('guests', formData.guests + 1)}
            className="w-20 h-20 flex items-center justify-center text-gray-900 border-l-2 border-gray-100 active:bg-gray-50 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Cake Ready By */}
      <section>
        <SectionHeader title="Cake Ready By" required />
        <button className="w-full flex items-center justify-between bg-white border-2 border-gray-100 rounded-2xl px-5 py-5 text-[15px] font-bold text-gray-900 active:bg-gray-50 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
              <Calendar className="w-5 h-5" />
            </div>
            <span>{formData.readyBy}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </section>

      {/* Delivery Section */}
      <section>
        <SectionHeader title="Delivery" />
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-5 border border-transparent">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900 leading-tight">Delivery needed</p>
                <p className="text-[12px] font-medium text-gray-500 mt-0.5">Kitchen delivers to you</p>
              </div>
            </div>
            <Switch 
              checked={formData.delivery}
              onCheckedChange={(checked) => updateField('delivery', checked)}
              className="data-[state=checked]:bg-gray-900 h-8 w-14"
            />
          </div>
          
          {formData.delivery && (
            <div className="flex items-center gap-4 bg-white border-2 border-gray-100 rounded-2xl px-5 py-5 animate-in fade-in slide-in-from-top-2 duration-300">
              <MapPin className="w-5 h-5 text-gray-400" />
              <Input 
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="flex-1 text-[15px] font-bold text-gray-900 border-none p-0 h-auto focus-visible:ring-0 shadow-none bg-transparent"
                placeholder="Enter delivery address"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Cake Size & Tiers */}
      <section>
        <SectionHeader title="Cake Size & Tiers" required />
        <RadioGroup value={formData.size} onValueChange={(val) => updateField('size', val)} className="gap-3">
          {sizes.map((s) => (
            <label 
              key={s.label}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                formData.size === s.label ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value={s.label} className="border-2 border-gray-300 text-gray-900 focus-visible:ring-gray-900" />
                <span className={`text-[15px] font-bold ${formData.size === s.label ? 'text-gray-900' : 'text-gray-600'}`}>
                  {s.label}
                </span>
              </div>
              <span className="text-[14px] font-extrabold text-gray-900 uppercase">
                {s.price}
              </span>
            </label>
          ))}
        </RadioGroup>
      </section>

      {/* Sponge Flavor */}
      <section>
        <SectionHeader title="Sponge Flavor" required />
        <div className="flex flex-wrap gap-2">
          {sponges.map(s => (
            <Button
              key={s}
              variant={formData.sponge === s ? "default" : "outline"}
              onClick={() => updateField('sponge', s)}
              className={`h-11 px-5 rounded-2xl text-[14px] font-bold transition-all ${
                formData.sponge === s 
                  ? 'bg-gray-900 text-white' 
                  : 'border-2 border-gray-100 bg-white text-gray-600 hover:border-gray-200'
              }`}
            >
              {s}
            </Button>
          ))}
        </div>
      </section>

      {/* Filling Selection */}
      <section>
        <SectionHeader title="Filling" required />
        <div className="flex flex-wrap gap-2">
          {fillings.map(f => (
            <Button
              key={f}
              variant={formData.filling === f ? "default" : "outline"}
              onClick={() => updateField('filling', f)}
              className={`h-11 px-5 rounded-2xl text-[14px] font-bold transition-all ${
                formData.filling === f 
                  ? 'bg-gray-900 text-white' 
                  : 'border-2 border-gray-100 bg-white text-gray-600 hover:border-gray-200'
              }`}
            >
              {f}
            </Button>
          ))}
        </div>
      </section>

      {/* Color Palette */}
      <section>
        <SectionHeader title="Color Palette" />
        <div className="flex gap-5">
          {formData.colors.map(color => (
            <div key={color} className="flex flex-col items-center gap-2">
              <div 
                className={`w-14 h-14 rounded-full border-4 border-white ring-1 ring-gray-100`}
                style={{ backgroundColor: color.toLowerCase() === 'gold' ? '#D4AF37' : color.toLowerCase() === 'blush' ? '#F4C2C2' : color.toLowerCase() }}
              />
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{color}</span>
            </div>
          ))}
          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-all bg-gray-50">
              <Plus className="w-7 h-7" />
            </div>
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Add</span>
          </button>
        </div>
      </section>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Your Brief */}
      <section>
        <SectionHeader title="Your Brief" required />
        <p className="text-[14px] font-medium text-gray-500 mb-4 leading-relaxed">
          Describe your vision — style, mood, decorations, references.
        </p>
        <Textarea 
          value={formData.brief}
          onChange={(e) => updateField('brief', e.target.value)}
          className="min-h-[160px] bg-gray-50 border-transparent rounded-2xl px-5 py-5 text-[15px] font-medium focus-visible:ring-gray-900 focus-visible:bg-white transition-all shadow-none leading-relaxed resize-none"
          placeholder="e.g., Minimalist cake with gold flakes..."
        />
      </section>

      {/* Message on Cake */}
      <section>
        <SectionHeader title="Message on Cake" optional />
        <div className="relative">
          <Input 
            type="text" 
            value={formData.cakeMessage}
            onChange={(e) => updateField('cakeMessage', e.target.value)}
            className="h-14 bg-gray-50 border-transparent rounded-2xl px-5 text-[15px] font-bold focus-visible:ring-gray-900 focus-visible:bg-white transition-all shadow-none"
            maxLength={40}
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[12px] font-bold text-gray-400">
            {formData.cakeMessage.length}/40
          </span>
        </div>
      </section>

      {/* Allergens to Avoid */}
      <section>
        <SectionHeader title="Allergens to Avoid" />
        <p className="text-[14px] font-medium text-gray-500 mb-4">
          Select any allergens the cake must not contain.
        </p>
        <div className="flex flex-wrap gap-2">
          {allAllergens.map(allergen => (
            <button
              key={allergen}
              onClick={() => toggleArrayItem('allergens', allergen)}
              className={`px-4 py-2.5 rounded-2xl text-[14px] font-bold transition-all border-2 flex items-center gap-2 ${
                formData.allergens.includes(allergen) 
                  ? 'border-orange-200 bg-orange-50 text-orange-700' 
                  : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
              }`}
            >
              {formData.allergens.includes(allergen) && <Check className="w-4 h-4" />}
              {allergen}
            </button>
          ))}
          <button className="px-4 py-2.5 rounded-2xl text-[14px] font-bold border-2 border-dashed border-gray-200 text-gray-400 flex items-center gap-2 hover:border-gray-400 transition-all bg-gray-50">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </section>

      {/* Inspiration Photo */}
      <section>
        <SectionHeader title="Inspiration Photo" optional />
        <p className="text-[14px] font-medium text-gray-500 mb-5 leading-relaxed">
          Upload a photo to show the color palette, style, or specific details.
        </p>
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100 mb-4">
              <Camera className="w-7 h-7" />
            </div>
            <p className="text-[15px] font-bold text-gray-900">Tap to upload a photo</p>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">JPEG, PNG up to 5MB</p>
          </div>
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </section>

      {/* Special Instructions */}
      <section>
        <SectionHeader title="Special Instructions" optional />
        <Textarea 
          value={formData.specialInstructions}
          onChange={(e) => updateField('specialInstructions', e.target.value)}
          placeholder="Any allergy notes, specific color shades, delivery preferences..."
          className="min-h-[120px] bg-gray-50 border-transparent rounded-2xl px-5 py-5 text-[15px] font-medium focus-visible:ring-gray-900 focus-visible:bg-white transition-all shadow-none leading-relaxed resize-none"
        />
      </section>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Budget Range */}
      <section>
        <div className="flex flex-col mb-6">
          <h3 className="text-[18px] font-black text-gray-900 mb-1 tracking-tight">Budget Range</h3>
          <p className="text-[14px] font-medium text-gray-500">Set the range you're comfortable spending.</p>
        </div>
        
        <div className="bg-gray-50 rounded-[32px] p-8 space-y-12 border border-transparent">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-black text-gray-900 tracking-tight leading-none">€{formData.budgetMin}</span>
              <Badge variant="secondary" className="bg-transparent text-gray-400 font-bold uppercase tracking-widest border-none p-0 mt-2 text-[10px]">Min</Badge>
            </div>
            <div className="w-12 h-[3px] bg-gray-200 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-[32px] font-black text-gray-900 tracking-tight leading-none">€{formData.budgetMax}</span>
              <Badge variant="secondary" className="bg-transparent text-gray-400 font-bold uppercase tracking-widest border-none p-0 mt-2 text-[10px]">Max</Badge>
            </div>
          </div>

          {/* DNA-Aligned Custom Slider Implementation */}
          <div className="px-2">
            <SliderPrimitive.Root
              className="relative flex w-full touch-none items-center select-none h-10"
              defaultValue={[20, 60]}
              max={100}
              step={1}
              onValueChange={(val) => {
                updateField('budgetMin', 100 + val[0]);
                updateField('budgetMax', 100 + val[1]);
              }}
            >
              <SliderPrimitive.Track className="bg-gray-200 relative grow overflow-hidden rounded-full h-[6px]">
                <SliderPrimitive.Range className="bg-gray-900 absolute h-full rounded-full" />
              </SliderPrimitive.Track>
              
              <SliderPrimitive.Thumb className="block size-8 rounded-full border-[4px] border-gray-900 bg-white ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 active:scale-95 cursor-pointer shadow-none" aria-label="Min Budget" />
              <SliderPrimitive.Thumb className="block size-8 rounded-full border-[4px] border-gray-900 bg-white ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 active:scale-95 cursor-pointer shadow-none" aria-label="Max Budget" />
            </SliderPrimitive.Root>
          </div>

          <div className="flex gap-2">
            {['Under €100', '€100–€200', '€200–€400', '€400+'].map(range => (
              <Button
                key={range}
                variant="outline"
                className={`flex-1 h-10 rounded-xl text-[11px] font-bold transition-all border-2 ${
                  range === '€100–€200' 
                    ? 'border-gray-900 bg-gray-900 text-white' 
                    : 'border-transparent bg-white text-gray-400 hover:border-gray-200'
                }`}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section>
        <h3 className="text-[18px] font-extrabold text-gray-900 mb-6 tracking-tight">Review Your Inquiry</h3>
        
        <div className="space-y-6">
          {/* Header Card Style Info */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-transparent">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center shrink-0">
                <Cake className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex-1">
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-1">Inquiry Title</Badge>
                <p className="text-[17px] font-extrabold text-gray-900">{formData.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200/60">
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-1">Event</Badge>
                <p className="text-[14px] font-bold text-gray-900">{formData.eventType}</p>
              </div>
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-1">Guests</Badge>
                <p className="text-[14px] font-bold text-gray-900">{formData.guests} people</p>
              </div>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-5 px-1">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-0.5">Ready By</Badge>
                <p className="text-[15px] font-bold text-gray-900">{formData.readyBy}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-0.5">Delivery</Badge>
                <p className="text-[15px] font-bold text-gray-900">{formData.delivery ? formData.address : 'Self Pick-up'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Info className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-0.5">Cake Specifications</Badge>
                <p className="text-[15px] font-bold text-gray-900 mb-1">{formData.size}</p>
                <p className="text-[14px] font-medium text-gray-500">
                  {formData.sponge} sponge with {formData.filling} filling.
                </p>
                <div className="flex gap-2 mt-2">
                  {formData.colors.map(c => (
                    <div key={c} className="w-6 h-6 rounded-full border border-gray-200" style={{ backgroundColor: c.toLowerCase() === 'gold' ? '#D4AF37' : c.toLowerCase() === 'blush' ? '#F4C2C2' : c.toLowerCase() }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
              <div>
                <Badge variant="secondary" className="bg-transparent p-0 text-gray-400 font-bold uppercase tracking-wide border-none mb-0.5">Brief & Restrictions</Badge>
                <p className="text-[14px] font-medium text-gray-900 leading-relaxed mb-2">{formData.brief}</p>
                {formData.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {formData.allergens.map(a => (
                      <Badge key={a} variant="secondary" className="bg-orange-50 text-orange-700 text-[10px] font-bold rounded-md border border-orange-100 uppercase py-0.5">
                        No {a}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <div className="bg-gray-50 rounded-[32px] p-6 flex items-center gap-5 border-2 border-dashed border-gray-200">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shrink-0">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <p className="text-[16px] font-extrabold text-gray-900 mb-0.5">12 kitchens nearby</p>
          <p className="text-[13px] font-medium text-gray-500">will receive and review your inquiry immediately.</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-4 pt-4">
        <Button 
          onClick={() => {
            toast.success('Inquiry submitted successfully!');
            setTimeout(() => navigate('/orders'), 1500);
          }}
          className="w-full h-16 bg-gray-900 text-white rounded-3xl font-bold text-[17px] flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:bg-black border-none"
        >
          <Check className="w-5 h-5" />
          Submit Inquiry
        </Button>
        <p className="text-[12px] font-bold text-gray-400 text-center uppercase tracking-[0.1em]">
          Kitchens will send quotes within 24 hours
        </p>
      </div>
    </div>
  );

  const stepsInfo = [
    { label: 'Event Details', current: 1, total: 4 },
    { label: 'Cake Details', current: 2, total: 4 },
    { label: 'Brief & Allergens', current: 3, total: 4 },
    { label: 'Budget & Review', current: 4, total: 4 }
  ];

  const currentStepInfo = stepsInfo[step - 1];

  return (
    <div className="min-h-screen bg-white font-inter text-gray-900 pb-[140px] selection:bg-gray-900 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl pt-10 pb-4 border-b border-gray-100">
        <div className="px-4 flex items-center justify-between">
          <button 
            onClick={step === 1 ? () => navigate('/profile') : prevStep}
            className="w-10 h-10 -ml-2 rounded-2xl flex items-center justify-center active:bg-gray-50 transition-colors"
          >
            {step === 1 ? <X className="w-6 h-6 text-gray-900" /> : <ChevronLeft className="w-6 h-6 text-gray-900" />}
          </button>
          
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <h1 className="text-[15px] font-extrabold text-gray-900 tracking-tight">New Cake Inquiry</h1>
            <Badge variant="secondary" className="bg-transparent text-gray-500 font-bold uppercase tracking-widest border-none p-0 text-[11px]">{currentStepInfo.label}</Badge>
          </div>

          <div className="w-10 h-10 -mr-2 flex items-center justify-center">
            <span className="text-[14px] font-black text-gray-900">{step}/4</span>
          </div>
        </div>
      </header>

      <main className="px-5 pt-8">
        {/* Progress Tracker DNA Style */}
        <div className="mb-10">
          <div className="flex gap-1.5 h-1.5 mb-4">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`flex-1 rounded-full transition-all duration-500 ${
                  s <= step ? 'bg-gray-900' : 'bg-gray-100'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </main>

      {/* Footer Navigation */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-40 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <Button 
            onClick={nextStep}
            className="w-full h-[56px] bg-gray-900 text-white rounded-2xl font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-black shadow-none border-none"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
