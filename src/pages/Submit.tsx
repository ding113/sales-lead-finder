import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  Camera,
  Building2,
  Globe,
  Mail,
  Phone,
  Link as LinkIcon,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  mockIndustries,
  mockLocations,
  mockCompanySizes,
} from "../mocks/distributors";

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    location: "",
    industry: [] as string[],
    establishedYear: new Date().getFullYear(),
    companySize: "",
    contact: {
      email: "",
      phone: "",
      website: "",
    },
    tags: [],
    logo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/"); // Redirect to home page after successful submission
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8 px-4">
      <div className="flex justify-between items-center max-w-3xl mx-auto relative">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1">
            <div className="flex items-center justify-center relative z-10 w-full">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  num <= step
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => num < step && setStep(num)}
              >
                {num}
              </motion.div>
              {num < 3 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-1 -z-10 ${
                    num < step ? "bg-primary-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between max-w-3xl mx-auto mt-2">
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-600">Basic Info</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-600">Company Details</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-600">Contact & Submit</span>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
              {formData.logo ? (
                <img
                  src={formData.logo}
                  alt="Company logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl text-white"
              onClick={() => {
                // In demo, use a placeholder image
                handleInputChange("logo", "/api/placeholder/128/128");
              }}
            >
              Upload Logo
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your company name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32"
            placeholder="Describe your company and its core business..."
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg flex items-center space-x-2"
          onClick={() => setStep(2)}
          disabled={!formData.companyName || !formData.description}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location *
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select location</option>
            {mockLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Size *
          </label>
          <select
            value={formData.companySize}
            onChange={(e) => handleInputChange("companySize", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select size</option>
            {mockCompanySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Industries *
        </label>
        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-lg">
          {mockIndustries.map((industry) => (
            <label key={industry} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.industry.includes(industry)}
                onChange={(e) => {
                  const newIndustries = e.target.checked
                    ? [...formData.industry, industry]
                    : formData.industry.filter((i) => i !== industry);
                  handleInputChange("industry", newIndustries);
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-600">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm flex items-center space-x-1"
            >
              <span>{tag}</span>
              <button
                onClick={() => {
                  const newTags = [...formData.tags];
                  newTags.splice(index, 1);
                  handleInputChange("tags", newTags);
                }}
                className="hover:text-primary-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a tag"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                e.preventDefault();
                handleInputChange("tags", [
                  ...formData.tags,
                  e.currentTarget.value.trim(),
                ]);
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg"
          onClick={() => setStep(1)}
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg flex items-center space-x-2"
          onClick={() => setStep(3)}
          disabled={
            !formData.location ||
            !formData.companySize ||
            formData.industry.length === 0
          }
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.contact.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="contact@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            value={formData.contact.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+1 234 567 890"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          type="url"
          value={formData.contact.website}
          onChange={(e) => handleContactChange("website", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://www.company.com"
        />
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Review Your Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            icon={Building2}
            label="Company"
            value={formData.companyName}
          />
          <InfoItem icon={MapPin} label="Location" value={formData.location} />
          <InfoItem icon={Users} label="Size" value={formData.companySize} />
          <InfoItem
            icon={Calendar}
            label="Established"
            value={formData.establishedYear.toString()}
          />
          <InfoItem
            icon={Globe}
            label="Industries"
            value={formData.industry.join(", ")}
          />
          <InfoItem icon={Mail} label="Email" value={formData.contact.email} />
          <InfoItem icon={Phone} label="Phone" value={formData.contact.phone} />
          <InfoItem
            icon={LinkIcon}
            label="Website"
            value={formData.contact.website}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg"
          onClick={() => setStep(2)}
        >
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg flex items-center space-x-2"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span>Submit</span>
          )}
        </motion.button>
      </div>

      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-green-50 border-l-4 border-green-400 p-4"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Submission successful! Thank you for providing your information.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-gray-500" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Submit Your Distributor Information
        </h1>
        {renderStepIndicator()}
        <form>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>
      </div>
    </Layout>
  );
};

export default Submit;
