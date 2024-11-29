import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface DistributorFormData {
  name: string;
  industry: string;
  location: string;
  companySize: string;
  rating: number;
  description: string;
  website: string;
  contactEmail: string;
}

export const SubmitForm: React.FC = () => {
  const navigate = useNavigate();
  const [distributors, setDistributors] = useLocalStorage<
    DistributorFormData[]
  >("distributors", []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DistributorFormData>();

  const onSubmit = async (data: DistributorFormData) => {
    try {
      const newDistributor = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      setDistributors((prev) => [...prev, newDistributor]);
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">Submit New Distributor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            {...register("name", { required: "Company name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <select
            {...register("industry", { required: "Industry is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail">Retail</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <select
            {...register("companySize", {
              required: "Company size is required",
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
          {errors.companySize && (
            <p className="mt-1 text-sm text-red-600">
              {errors.companySize.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Minimum rating is 1" },
              max: { value: 5, message: "Maximum rating is 5" },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            {...register("website", {
              required: "Website is required",
              pattern: {
                value: /^https?:\/\/.+\..+/,
                message: "Please enter a valid URL",
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">
              {errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            {...register("contactEmail", {
              required: "Contact email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.contactEmail && (
            <p className="mt-1 text-sm text-red-600">
              {errors.contactEmail.message}
            </p>
          )}
        </div>

        <div className="pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Distributor"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
