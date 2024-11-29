import React from "react";
import { motion } from "framer-motion";
import { Construction, Rocket } from "lucide-react";
import Layout from "./Layout";

interface UnderConstructionProps {
  title: string;
  description: string;
  vision?: string;
  expectedDate?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title,
  description,
  vision,
  expectedDate,
}) => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-8 bg-primary-50 rounded-full flex items-center justify-center"
          >
            <Construction className="w-12 h-12 text-primary-600" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>

          {vision && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-primary-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-primary-800">{vision}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <div className="h-2 w-64 mx-auto bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500"
                initial={{ width: 0 }}
                animate={{ width: "30%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Development in progress
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default UnderConstruction;
