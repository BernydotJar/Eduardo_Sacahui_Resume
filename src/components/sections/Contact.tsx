"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/context/LanguageContext";

const contactRecipient = ["eduardo", ".sacahui", "@", "gmail", ".com"].join("");

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const simulateContactSubmit = async (
  values: ContactFormValues
): Promise<{ success: boolean; message?: string }> => {
  const subject = encodeURIComponent(`Portfolio contact from ${values.name}`);
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
  );
  window.location.href = `mailto:${contactRecipient}?subject=${subject}&body=${body}`;
  return { success: true };
};

const Contact = () => {
    const { toast } = useToast();
    const { dict } = useLanguage();
    const formSchema = useMemo(
      () =>
        z.object({
          name: z.string().min(2, dict.contact.validation.nameMin),
          email: z.string().email(dict.contact.validation.emailInvalid),
          message: z.string().min(10, dict.contact.validation.messageMin),
        }),
      [dict.contact.validation.emailInvalid, dict.contact.validation.messageMin, dict.contact.validation.nameMin]
    );

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        const result = await simulateContactSubmit(values);
        if (result.success) {
            toast({
                title: dict.contact.toastSuccessTitle,
                description: dict.contact.toastSuccessDescription,
            });
            form.reset();
        } else {
            toast({
                variant: "destructive",
                title: dict.contact.toastErrorTitle,
                description: result.message || dict.contact.toastErrorDescription,
            });
        }
    };

    return (
        <section id="contact" className="relative bg-background pixel-grid py-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.02),transparent_60%)]" />
            
            <div className="container relative z-10 max-w-4xl">
                {/* Framed Console Panel */}
                <div className="glass-panel relative overflow-hidden rounded-xl border border-white/5 bg-zinc-950/40 p-6 shadow-2xl sm:p-10 blueprint-cross blueprint-cross-tl blueprint-cross-tr blueprint-cross-bl blueprint-cross-br">
                    <div className="absolute inset-0 pixel-grid pointer-events-none opacity-20" />
                    
                    <div className="relative z-10 text-center mb-8 border-b border-white/5 pb-6">
                        <p className="font-code text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">[SYS.CONTACT_FLOW // COMMS_INBOX]</p>
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{dict.contact.title}</h2>
                        <p className="mt-3 text-sm text-muted-foreground leading-6">{dict.contact.subtitle}</p>
                        <p className="mt-1 text-xs text-muted-foreground/60 font-code">
                          {dict.contact.staticSiteNote}
                        </p>
                    </div>

                    <div className="relative z-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-code text-[10px] uppercase tracking-wider text-muted-foreground/80">{dict.contact.name}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder={dict.contact.namePlaceholder} 
                                                    className="bg-zinc-950/60 border-white/5 focus-visible:ring-primary/45 rounded-md h-10 font-mono text-sm"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-code text-[10px] uppercase tracking-wider text-muted-foreground/80">{dict.contact.email}</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder={dict.contact.emailPlaceholder} 
                                                    className="bg-zinc-950/60 border-white/5 focus-visible:ring-primary/45 rounded-md h-10 font-mono text-sm"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-code text-[10px] uppercase tracking-wider text-muted-foreground/80">{dict.contact.message}</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder={dict.contact.messagePlaceholder} 
                                                    className="bg-zinc-950/60 border-white/5 focus-visible:ring-primary/45 rounded-md min-h-[120px] font-mono text-sm leading-relaxed"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 mt-8">
                                    <Button 
                                        type="submit" 
                                        disabled={form.formState.isSubmitting}
                                        className="w-full sm:w-auto px-6 h-10 border border-primary hover:bg-primary/95 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all font-code text-xs uppercase tracking-wider"
                                    >
                                        {form.formState.isSubmitting ? dict.contact.sending : dict.contact.sendMessage}
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center sm:text-right font-code">
                                      {dict.contact.preferDirectEmail}{" "}
                                      <a href={`mailto:${contactRecipient}`} className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
                                        {contactRecipient}
                                      </a>
                                    </p>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
