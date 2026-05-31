import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send to an API
    console.log(values);
    
    toast({
      title: "Transmission Sent",
      description: "Your message has entered the ether. We will respond in due time.",
      duration: 5000,
    });
    
    form.reset();
  }

  return (
    <div className="min-h-[80vh] py-20 bg-background flex items-center">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 glow-purple">
              Make Contact
            </h1>
            <p className="text-xl font-body italic text-muted-foreground mb-12">
              Send us a signal. Whether you want to discuss a rare vinyl pressing, review a piece of vintage gear, or just talk about Prince.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">Email</h3>
                  <p>signals@purplerain.audio</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-card-border p-8 rounded-xl card-glow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-display">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" className="bg-background border-input focus-visible:ring-primary" {...field} />
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
                      <FormLabel className="font-display">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" className="bg-background border-input focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-display">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this regarding?" className="bg-background border-input focus-visible:ring-primary" {...field} />
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
                      <FormLabel className="font-display">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your transmission..." 
                          className="min-h-[150px] bg-background border-input focus-visible:ring-primary resize-y" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full font-display font-bold tracking-wider text-lg h-12 glow-magenta hover:bg-accent hover:text-white transition-colors">
                  <Send className="w-5 h-5 mr-2" />
                  SEND TRANSMISSION
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
