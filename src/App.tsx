import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Team members data
const teamMembers = [
  {
    name: 'Ransom Cherechi',
    role: 'Team Lead & Developer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//WhatsApp%20Image%202025-02-20%20at%2017.01.20_a8078254.jpg',
    socials: {
      twitter: 'https://x.com/eze_ransom',
      github: 'https://github.com/Ransom070400',
      linkedin: 'https://www.linkedin.com/in/eze-ransom-281640295'
    }
  },
  {
    name: 'Kosi ',
    role: 'Lead UI/UX Designer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//WhatsApp%20Image%202025-01-25%20at%2011.15.33_6c2bbb52.jpg',
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Goerge Goldman',
    role: ' Lead Developer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//WhatsApp%20Image%202025-01-27%20at%2015.37.20_47bb3e93.jpg',
    socials: {
      twitter: 'https://x.com/0xgeorgegoldman',
      github: ' https://github.com/georgegoldman',
      linkedin: 'https://www.linkedin.com/in/georgegoldmanjohn/'
    }
  },
  {
    name: 'Hillary',
    role: 'Lead Frontend Developer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//WhatsApp%20Image%202025-01-27%20at%2015.23.01_8d6e0880.jpg',
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com/johnmartins-hillary',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Uguanyi Afam',
    role: 'Backend Developer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//111662034.jpg',
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Nedu',
    role: 'Frontend Developer',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//V0e3__w1_400x400.jpg',
    socials: {
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  }
];

// Projects data
const projects = [
  {
    id: 'metamuse',
    title: 'Metamuse',
    description: 'A Web3 platform where artists collaborate, mint NFTs, and showcase their work in a decentralized marketplace.',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//WhatsApp%20Image%202025-01-29%20at%2012.57.39_ea53122f.jpg',
    technologies: ['React', 'Solidity', 'IPFS', 'Ethereum', 'SUI'],
    link: 'https://metamuse.io'
  },
  {
    id: 'bingo',
    title: 'Bingo',
    description: ' A blockchain-powered platform that connects waste producers to recyclers, promoting sustainability and efficient waste management.',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//Bingo.jpg',
    technologies: ['React.js', 'ICP', 'WebGL', 'TypeScript'],
    link: 'https://bingo.network'
  },
  {
    id: 'flowx',
    title: 'FlowX',
    description: ' A cross-border liquidity protocol on SUI, enabling fast, low-cost stablecoin transactions for DeFi and financial apps in Africa.',
    image: 'https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//flow.webp',
    technologies: ['React.js', 'Move', 'SUI', 'WebAssembly'],
    link: 'https://flowx.finance'
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();

  const homeRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
        setActiveSection('home');
      } else if (teamRef.current && scrollPosition < teamRef.current.offsetTop + teamRef.current.offsetHeight) {
        setActiveSection('team');
      } else if (projectsRef.current && scrollPosition < projectsRef.current.offsetTop + projectsRef.current.offsetHeight) {
        setActiveSection('projects');
      } else if (contactRef.current) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    setMenuOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="relative bg-black text-white min-h-screen overflow-x-hidden">
      {/* 3D Background */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x / 30}% ${50 + mousePosition.y / 30}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), 
                            radial-gradient(circle at ${30 - mousePosition.x / 20}% ${70 - mousePosition.y / 20}%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)`,
          y: backgroundY,
          scale: backgroundScale,
          backgroundSize: '100% 100%',
        }}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
      </motion.div>

      {/* Floating Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
          <img 
        src="https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//hkilXoSI_400x400.jpg" 
        alt="Code-X Lab Logo" 
        className="w-10 h-10 rounded-full object-contain"
      />
            <span className="text-xl font-bold tracking-wider">CODE-X LAB</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {[
              { name: 'Home', ref: homeRef, id: 'home' },
              { name: 'Team', ref: teamRef, id: 'team' },
              { name: 'Projects', ref: projectsRef, id: 'projects' },
              { name: 'Contact', ref: contactRef, id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref)}
                className={`text-sm uppercase tracking-wider hover:text-white transition-colors ${
                  activeSection === item.id ? 'text-white' : 'text-white/60'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {menuOpen && (
        <motion.div 
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {[
            { name: 'Home', ref: homeRef, id: 'home' },
            { name: 'Team', ref: teamRef, id: 'team' },
            { name: 'Projects', ref: projectsRef, id: 'projects' },
            { name: 'Contact', ref: contactRef, id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              className={`text-2xl uppercase tracking-wider hover:text-white transition-colors ${
                activeSection === item.id ? 'text-white' : 'text-white/60'
              }`}
            >
              {item.name}
            </button>
          ))}
        </motion.div>
      )}

      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={homeRef}
          className="min-h-screen flex flex-col items-center justify-center px-4 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
           <motion.div 
  className="mb-6 mx-auto w-32 h-32 rounded-full bg-white flex items-center justify-center"
  style={{ 
    rotateX: mousePosition.y * 0.1, 
    rotateY: mousePosition.x * 0.1,
    perspective: "1000px"
  }}
>
  <img 
    src="https://cocozqaswhyugfbilbxk.supabase.co/storage/v1/object/public/Codex-Lab//hkilXoSI_400x400.jpg" 
    alt="Code-X Lab Logo" 
    className="w-24 h-24 object-contain rounded-full"
  />
</motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              CODE-X LAB
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 tracking-wide">
              Pushing the Boundaries of Web3 Innovation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection(projectsRef)}
                className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              >
                Our Projects
              </Button>
              <Button 
                onClick={() => scrollToSection(contactRef)}
                variant="outline" 
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
              >
                Get in Touch
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section 
          ref={teamRef}
          className="py-24 px-4 relative"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Our Team</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Meet the brilliant minds behind Code-X Lab, pushing the boundaries of what's possible in Web3.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-center"
                >
                  <motion.div 
                    className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-white/60 mb-3">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <Twitter size={18} />
                    </a>
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={projectsRef}
          className="py-24 px-4 relative bg-white/5"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Our Projects</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Explore our groundbreaking Web3 projects that are redefining digital experiences.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card 
                    className="bg-black border border-white/10 overflow-hidden h-full flex flex-col"
                  >
                    <motion.div 
                      className="relative h-48 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <h3 className="absolute bottom-4 left-4 text-2xl font-bold">{project.title}</h3>
                    </motion.div>
                    <div className="p-4 flex-grow flex flex-col">
                      <p className="text-white/70 mb-4 flex-grow">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                        >
                          {selectedProject === project.id ? 'Less Info' : 'More Info'}
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-white text-black hover:bg-white/90"
                          asChild
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Expanded Project Details */}
                    {selectedProject === project.id && (
                      <motion.div 
                        className="p-4 border-t border-white/10 bg-white/5"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Tabs defaultValue="overview">
                          <TabsList className="bg-black border border-white/20">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                          </TabsList>
                          <TabsContent value="overview" className="pt-4">
                            <p className="text-white/70">
                              {project.title} is our flagship {project.id === 'metamuse' ? 'music platform' : 
                                project.id === 'bingo' ? 'gaming solution' : 'DeFi protocol'} 
                              designed to revolutionize the way users interact with 
                              {project.id === 'metamuse' ? ' digital music ownership.' : 
                                project.id === 'bingo' ? ' blockchain gaming.' : ' cross-chain finance.'}
                            </p>
                          </TabsContent>
                          <TabsContent value="features" className="pt-4">
                            <ul className="text-white/70 space-y-2">
                              {project.id === 'metamuse' ? (
                                <>
                                  <li>• NFT Marketplce</li>
                                  <li>• Realtime collaboration in one canvas</li>
                                  <li>• Fractional distribution royalties</li>
                                </>
                              ) : project.id === 'bingo' ? (
                                <>
                                  <li>• Sustainable</li>
                                  <li>• Ai waste Selector</li>
                                  <li>• Cryptocurrency rewards system</li>
                                </>
                              ) : (
                                <>
                                  <li>• Cross-chain asset transfers</li>
                                  <li>• Liquidity aggregation protocol</li>
                                  <li>• Minimal slippage guarantees</li>
                                </>
                              )}
                            </ul>
                          </TabsContent>
                          <TabsContent value="tech" className="pt-4">
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map(tech => (
                                <span key={tech} className="text-xs bg-white/10 px-3 py-1.5 rounded-full">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={contactRef}
          className="py-24 px-4 relative"
        >
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">Get in Touch</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Have a project in mind? Let's collaborate and build something extraordinary together.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Subject" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your Message" 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-white text-black hover:bg-white/90"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                  <p className="text-white/70 mb-6">
                    We're always looking for new challenges and opportunities to push the boundaries of Web3 technology.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Mail className="text-white/60" size={20} />
                      <span className="text-white/80">codexteam042@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-xs">X</span>
                      </div>
                      <span className="text-white/80">Enugu Nigeria</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                  <div className="flex gap-4">
                    <a 
                      href="https://x.com/codeXlab_" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href="https://github.com/CodeX042" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/posts/codex-labsite_introducing-metamuse-the-future-of-digital-activity-7290367701179420672-UCvA?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEd2nYEBzuDWx9w9DC4nK2ZZGjMiF1Clxzc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">X</div>
              <span className="text-lg font-bold tracking-wider">CODE-X LAB</span>
            </div>
            
            <div className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Code-X Lab. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;