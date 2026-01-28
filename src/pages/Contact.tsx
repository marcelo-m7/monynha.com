import { useCallback, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Instagram, Send } from "lucide-react";
import { GlassIcon } from "@/components/reactbits/GlassIcon";
import { RippleGridBackground } from "@/components/reactbits/RippleGridBackground";
import { useContactForm, contactSchema, ContactFormData } from "@/hooks/useContactForm";
import { useSiteSetting } from "@/hooks/useSettings";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNarrativeBlock } from "@/hooks/useNarrativeBlocks"; // Import new hook

const Contact = () => {
  const { toast } = useToast();
  const { mutate: submitContact, isPending } = useContactForm();
  const { data: contactPageIntroBlock } = useNarrativeBlock("contact_page_intro"); // Fetch specific narrative block

  const contactInfo = useSiteSetting<{ email?: string; instagram?: string; availability?: string; note?: string }>('contact_info', {});
  const formMessages = useSiteSetting<{ success?: string; error?: string }>('contact_form_messages', {});

  const contactEmail = contactInfo?.email || 'contact@monynha.com';
  const contactAvailability = contactInfo?.availability || 'Available for collaborations and creative opportunities.';
  const contactNote = contactInfo?.note || 'Get in touch for collaborations, partnerships, or out-of-the-box ideas!';
  const successMessage = formMessages?.success || 'Message sent successfully! I\'ll get back to you soon 🌈';
  const errorMessage = formMessages?.error || 'Oops! Something went wrong. Please try again later 💜';
  const instagramLink = contactInfo?.instagram;

  const contactPageIntro = contactPageIntroBlock?.content || "Monynha Softwares is dedicated to democratizing technology and fostering an inclusive digital culture. Whether you're planning a new platform, seeking product discovery, or want to improve accessibility, our team is ready to help.";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    submitContact(data, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: successMessage,
        });
        reset(); // Reset form fields on success
      },
      onError: (error) => {
        toast({
          title: "Error sending message",
          description: error.message || errorMessage, // Use specific error message if available
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden pt-24 pb-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <SectionReveal>
          <div className="mb-14 text-center">
            <h1 className="mb-4 text-[clamp(2rem,7vw,3.5rem)] font-bold leading-tight text-balance drop-shadow-[0_12px_32px_rgba(6,10,28,0.65)]">
              Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[clamp(1rem,3.4vw,1.15rem)] text-white/90 leading-relaxed text-balance drop-shadow-[0_10px_24px_rgba(5,6,20,0.55)]">
              {contactPageIntro}
            </p>
          </div>
        </SectionReveal>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-transparent p-2 sm:rounded-[2.5rem] sm:p-4">
          <RippleGridBackground />
          <div className="relative z-10 rounded-[1.75rem] p-6 text-white sm:rounded-[2.25rem] sm:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Contact Info */}
              <div className="col-span-1">
                <SectionReveal delay={0.1}>
                  <div className="space-y-8 text-white drop-shadow-[0_10px_30px_rgba(4,8,24,0.6)]">
                    <div>
                      <h2 className="mb-6 text-[clamp(1.5rem,5.5vw,2.5rem)] font-bold leading-tight text-white">
                        Let's Connect
                      </h2>
                      <p className="mb-6 text-[clamp(1rem,3.3vw,1.1rem)] text-white/85 leading-relaxed">
                        {contactAvailability} {contactNote}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {contactEmail && (
                        <GlassIcon
                          icon={<Mail className="h-6 w-6" />}
                          title="Email"
                          description={contactEmail}
                          href={`mailto:${contactEmail}`}
                        />
                      )}
                      {instagramLink && (
                        <GlassIcon
                          icon={<Instagram className="h-6 w-6" />}
                          title="Instagram"
                          description="@marcelo.santos.027" // Hardcoded for now, could be dynamic
                          href={instagramLink}
                        />
                      )}
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Contact Form */}
              <div className="col-span-1">
                <SectionReveal delay={0.2}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell me about your project or inquiry..."
                        rows={6}
                        className="resize-none"
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full motion-reduce:transition-none"
                      disabled={isPending}
                    >
                      {isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
