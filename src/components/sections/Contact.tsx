"use client";

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

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const contactRecipient = ["eduardo", ".sacahui", "@", "gmail", ".com"].join("");

const simulateContactSubmit = async (
  values: z.infer<typeof formSchema>
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await simulateContactSubmit(values);
        if (result.success) {
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. I'll get back to you soon.",
            });
            form.reset();
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result.message || "There was a problem with your request.",
            });
        }
    };

    return (
        <section id="contact" className="container">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Me</CardTitle>
                    <p className="mt-4 text-lg text-muted-foreground">Have a question or want to work together?</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This static site opens your email client to send your message.
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
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your.email@example.com" {...field} />
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
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell me how I can help" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                            </Button>
                            <p className="text-sm text-muted-foreground">
                              Prefer direct email?{" "}
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
