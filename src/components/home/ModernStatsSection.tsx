import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '15,000+',
    label: 'Active Farmers',
    description: 'Trusted by farmers worldwide',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    value: '45%',
    label: 'Yield Increase',
    description: 'Average improvement',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Award,
    value: '98%',
    label: 'Satisfaction Rate',
    description: 'Customer happiness',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    value: '24/7',
    label: 'AI Monitoring',
    description: 'Real-time insights',
    color: 'from-amber-500 to-orange-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function ModernStatsSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-secondary absolute inset-0 opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the growing community of farmers who have transformed their orchards 
            with our cutting-edge technology and expert guidance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              {/* Main Card */}
              <div className="glass rounded-2xl p-8 text-center border border-primary/10 shadow-elegant hover:shadow-glow transition-all duration-500">
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r ${stat.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-full h-full text-white" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gradient-primary">
                    {stat.value}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full group-hover:bg-primary/50 transition-colors"></div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 border border-primary/20 shadow-elegant max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">
              Ready to Transform Your Orchard?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of successful farmers who trust our platform for their agricultural needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="button-modern"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-primary/30 rounded-lg text-primary font-semibold hover:bg-primary/5 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}