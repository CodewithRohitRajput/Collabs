'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck, FiZap, FiUsers, FiMessageSquare, FiLayers } from 'react-icons/fi';
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="text-purple-400 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const PricingCard = ({ title, price, features, popular, delay }) => {
  return (
    <motion.div
      className={`relative p-8 rounded-2xl ${popular ? 'bg-gradient-to-br from-purple-600 to-indigo-600' : 'bg-gray-800'} border ${popular ? 'border-purple-500' : 'border-gray-700'} shadow-xl`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-gray-300">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <FiCheck className="mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-all ${popular ? 'bg-white text-purple-600 hover:bg-gray-100' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, content, delay }) => {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-xl border border-gray-700"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-300">"{content}"</p>
    </motion.div>
  );
};

const FloatingNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-gray-900/90 backdrop-blur-md border-b border-gray-800' : 'py-4'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            CS
          </motion.div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
            CollabSpace
          </span>
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
            Testimonials
          </Link>
          <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
            FAQ
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-300 hover:text-white transition-colors hidden md:block"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 z-10 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* <motion.span
            className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Version 3.0 is here!
          </motion.span> */}
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-indigo-200 bg-clip-text text-transparent mt-52 sm:mt-0 "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <br/>
          <br/>
          {/* <br/> */}
          COLLABSPACE
          <br />
          <span className="relative inline-block">
            {/* <span className="relative z-10">constraints</span> */}
            <motion.span
              className="absolute bottom-0 left-0 w-full h-2 bg-purple-500/30 z-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: "backOut" }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="text-xl -mt-8 md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          COLLABSPACE redefines team collaboration with seamless workspace management, 
          intuitive task assignment, and real-time communication.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center"
          >
            Get Started for Free
            <FiArrowRight className="ml-2" />
          </Link>
          <Link
            href="#demo"
            className="bg-gray-800 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-700 transition-all border border-gray-700 flex items-center justify-center"
          >
            Watch Demo
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="relative w-full max-w-4xl h-64 md:h-80 bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <FiZap className="text-purple-400" />
                </div>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-[url('/app-preview.png')] bg-cover bg-center opacity-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 1.8 }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="animate-bounce w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-gray-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { value: 10000, label: 'Active Teams', suffix: '+' },
    { value: 95, label: 'Satisfaction Rate', suffix: '%' },
    { value: 24, label: 'Support Response', suffix: 'h' },
    { value: 50, label: 'Countries', suffix: '+' },
  ];

  return (
    <section className="py-20 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CountUp = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCountUp();
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observerRef.current.observe(ref.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const startCountUp = () => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
  };

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything your team needs in one place
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            CollabSpace combines powerful tools to streamline your workflow and boost productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<FiLayers />}
            title="Workspace Management"
            description="Create, organize, and customize workspaces for different projects or teams."
            delay={0.1}
          />
          <FeatureCard
            icon={<FiUsers />}
            title="Team Collaboration"
            description="Invite team members, assign roles, and manage permissions with ease."
            delay={0.2}
          />
          <FeatureCard
            icon={<FiMessageSquare />}
            title="Real-Time Chat"
            description="Communicate instantly with your team through channels and direct messages."
            delay={0.3}
          />
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Advanced Task Management
              </h3>
              <p className="text-gray-300 mb-6">
                Our intuitive task system allows you to create, assign, and track tasks with
                customizable statuses, priorities, and deadlines.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <FiCheck className="text-purple-400" />
                  </div>
                  Drag-and-drop task organization
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <FiCheck className="text-purple-400" />
                  </div>
                  Custom workflows and statuses
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <FiCheck className="text-purple-400" />
                  </div>
                  Time tracking and reporting
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="relative h-64 md:h-80 bg-gray-700/50 rounded-xl border border-gray-600 overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <FiLayers className="text-purple-400" />
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-[url('/tasks-preview.png')] bg-cover bg-center opacity-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const [annualBilling, setAnnualBilling] = useState(false);

  const plans = [
    {
      title: "Starter",
      price: annualBilling ? "$8" : "$10",
      period: annualBilling ? "per month, billed annually" : "per month",
      features: [
        "Up to 5 workspaces",
        "10 projects per workspace",
        "Basic task management",
        "Unlimited team members",
        "Standard support"
      ],
      popular: false
    },
    {
      title: "Pro",
      price: annualBilling ? "$24" : "$29",
      period: annualBilling ? "per month, billed annually" : "per month",
      features: [
        "Unlimited workspaces",
        "Unlimited projects",
        "Advanced task management",
        "Unlimited team members",
        "Priority support",
        "Custom workflows",
        "Advanced analytics"
      ],
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom",
      period: "Tailored to your needs",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "On-premise options",
        "SLA guarantees",
        "Custom integrations",
        "Training & onboarding",
        "24/7 premium support"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-900 border-t border-b border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your team's needs. No hidden fees, cancel anytime.
          </p>
          
          <motion.div
            className="flex items-center justify-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className={`mr-4 ${!annualBilling ? 'text-gray-300' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className={`relative w-14 h-8  rounded-full p-1 transition-colors duration-300 focus:outline-none ${annualBilling ? 'bg-purple-600  ' : 'bg-gray-700'}`}
            >
              <span
                className={`absolute w-6 h-6 -mt-3 -ml-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`ml-4 ${annualBilling ? 'text-gray-300' : 'text-gray-500'}`}>Annual (20% off)</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Need something custom? We offer enterprise solutions for large teams.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-colors"
          >
            Contact Sales
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content: "CollabSpace has transformed how our remote team works together. The task management system alone has increased our productivity by 40%."
    },
    {
      name: "Michael Chen",
      role: "CTO at StartupX",
      content: "We evaluated dozens of collaboration tools and CollabSpace stood out for its simplicity and powerful features. Our engineers love it."
    },
    {
      name: "Emma Rodriguez",
      role: "Marketing Director at BrandCo",
      content: "The real-time collaboration features have eliminated countless meetings and email threads. It's become indispensable for our team."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of satisfied teams who have transformed their workflow with CollabSpace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-300">
            <span className="font-medium">10,000+</span> teams worldwide
          </div>
          <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-300">
            <span className="font-medium">4.9/5</span> average rating
          </div>
          <div className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-300">
            <span className="font-medium">98%</span> customer satisfaction
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for all our paid plans. No credit card required."
    },
    {
      question: "Can I change plans later?",
      answer: "Absolutely! You can upgrade or downgrade your plan at any time."
    },
    {
      question: "How secure is my data with CollabSpace?",
      answer: "Security is our top priority. We use enterprise-grade encryption and comply with industry standards to protect your data."
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer: "We'll notify you before you reach your limits, and you can upgrade your plan at any time."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-900 border-t border-b border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about CollabSpace. Can't find the answer you're looking for?
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4 border-b border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                className="flex justify-between items-center w-full py-6 text-left focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <h3 className="text-lg font-medium text-gray-200">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-purple-400 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-gray-400">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Still have questions?
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your team's collaboration?
          </h2>
          <p className="text-xl text-purple-200 mb-10">
            Join thousands of teams who have streamlined their workflow with CollabSpace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-white/20 transition-all flex items-center justify-center"
            >
              Get Started for Free
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              href="/demo"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Schedule a Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 border-t border-gray-800">
//       <div className="container mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//           <div>
//             <Link href="/" className="flex items-center mb-6">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
//                 CS
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
//                 CollabSpace
//               </span>
//             </Link>
//             <p className="text-gray-400 mb-6">
//               The all-in-one collaboration platform for modern teams.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaTwitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaDiscord className="w-5 h-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <FaGithub className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
//                   Features
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
//                   Pricing
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/integrations" className="text-gray-400 hover:text-white transition-colors">
//                   Integrations
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/changelog" className="text-gray-400 hover:text-white transition-colors">
//                   Changelog
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
//                   Blog
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
//                   Documentation
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/guides" className="text-gray-400 hover:text-white transition-colors">
//                   Guides
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/webinars" className="text-gray-400 hover:text-white transition-colors">
//                   Webinars
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
//             <ul className="space-y-3">
//               <li>
//                 <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
//                   Careers
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
//                   Legal
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-400 mb-4 md:mb-0">
//             © {new Date().getFullYear()} CollabSpace. All rights reserved.
//           </p>
//           <div className="flex space-x-6">
//             <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
//               Privacy Policy
//             </Link>
//             <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
//               Terms of Service
//             </Link>
//             <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
//               Cookies
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <FloatingNav />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CtaSection />
      {/* <Footer /> */}
    </div>
  );
}