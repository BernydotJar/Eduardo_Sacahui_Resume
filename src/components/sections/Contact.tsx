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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
        <section id="contact" className="container">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.contact.title}</CardTitle>
                    <p className="mt-4 text-lg text-muted-foreground">{dict.contact.subtitle}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {dict.contact.staticSiteNote}
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl mx-auto">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{dict.contact.name}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={dict.contact.namePlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{dict.contact.email}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={dict.contact.emailPlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{dict.contact.message}</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={dict.contact.messagePlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? dict.contact.sending : dict.contact.sendMessage}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                              {dict.contact.preferDirectEmail}{" "}
                              <a href={`mailto:${contactRecipient}`} className="text-primary underline underline-offset-4">
                                {contactRecipient}
                              </a>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
};

export default Contact;
