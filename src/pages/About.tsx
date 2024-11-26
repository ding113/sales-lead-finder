// src/pages/About.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon, CodeIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/outline';
import Layout from '../components/Layout';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary-500/10 via-primary-400/5 to-primary-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            About <span className="text-primary-600">SalesLeadFinder</span>
          </motion.h1>
          <motion.p
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A revolutionary AI-powered platform connecting manufacturers with global distributors, making international trade simpler and more efficient.
          </motion.p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transforming Global Distribution
            </h2>
            <p className="text-xl text-gray-600">
              Our innovative solutions make finding the right business partners easier than ever
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: LightBulbIcon,
                title: "AI-Powered Matching",
                description: "Intelligent algorithms find perfect distributors based on your needs"
              },
              {
                icon: CodeIcon,
                title: "Modern Technology",
                description: "Built with cutting-edge tech stack ensuring reliability and performance"
              },
              {
                icon: UserGroupIcon,
                title: "Global Network",
                description: "Access to verified distributors across all major markets worldwide"
              },
              {
                icon: ChartBarIcon,
                title: "Data-Driven",
                description: "Make informed decisions with comprehensive analytics and insights"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Built with the latest technologies to ensure performance and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TechStack
              title="Frontend"
              items={['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
            />
            <TechStack
              title="Backend"
              items={['Node.js', 'Spring Boot', 'PostgreSQL', 'Redis']}
            />
            <TechStack
              title="AI & Search"
              items={['Azure OpenAI', 'MeiliSearch', 'Google PSE API']}
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're committed to revolutionizing how businesses connect globally, making international trade more accessible and efficient for everyone.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
            >
              Learn More About Our Mission
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

const TechStack: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-6 shadow-lg"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-primary-600 rounded-full" />
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default About;