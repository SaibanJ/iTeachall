'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { subjects } from '@/constants';
import { createCompanion } from '@/lib/actions/companion.actions';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Companion name is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  topic: z.string().min(1, { message: 'Topic is required.' }),
  voice: z.string().min(1, { message: 'Voice is required.' }),
  style: z.string().min(1, { message: 'Style is required.' }),
  duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
});

const labelStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.45)',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', subject: '', topic: '', voice: '', style: '', duration: 15 },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companion = await createCompanion(values);
    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      redirect('/');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Professor Ada" {...field} className="input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Subject</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem value={subject} key={subject} className="capitalize">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Duration (minutes)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} className="input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel style={labelStyle}>What should the companion teach?</FormLabel>
              <FormControl>
                <textarea
                  placeholder="e.g. Derivatives and integrals in calculus"
                  {...field}
                  rows={3}
                  className="w-full rounded-xl text-sm resize-none p-3"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(168,85,247,0.6)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Voice</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={labelStyle}>Teaching Style</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(236,72,153,0.2), transparent)',
          }}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer font-bold tracking-wide py-5"
          style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
            boxShadow: '0 0 30px rgba(168,85,247,0.35)',
            color: 'white',
            borderRadius: '14px',
            border: '1px solid rgba(168,85,247,0.4)',
          }}
        >
          Build Companion →
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
