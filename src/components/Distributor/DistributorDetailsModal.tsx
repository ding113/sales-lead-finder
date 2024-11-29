import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  XIcon,
  GlobeAltIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { Distributor } from "../../types";

interface DistributorDetailsModalProps {
  distributor: Distributor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DistributorDetailsModal: React.FC<
  DistributorDetailsModalProps
> = ({ distributor, isOpen, onClose }) => {
  if (!distributor) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-6 top-6">
                  <button
                    type="button"
                    className="rounded-full p-1.5 hover:bg-gray-100 focus:outline-none"
                    onClick={onClose}
                  >
                    <XIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Header */}
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                >
                  {distributor.companyName}
                </Dialog.Title>

                {/* Company Overview */}
                <div className="mb-6">
                  <p className="text-gray-600">{distributor.description}</p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span>Est. {distributor.establishedYear}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    <span>{distributor.companySize} employees</span>
                  </div>
                </div>

                {/* Industries */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {distributor.industry.map((ind) => (
                      <span
                        key={ind}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags/Specialties */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {distributor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${distributor.contact.email}`}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <MailIcon className="h-5 w-5 mr-2" />
                      {distributor.contact.email}
                    </a>
                    <a
                      href={`tel:${distributor.contact.phone}`}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <PhoneIcon className="h-5 w-5 mr-2" />
                      {distributor.contact.phone}
                    </a>
                    <a
                      href={`https://${distributor.contact.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <GlobeAltIcon className="h-5 w-5 mr-2" />
                      {distributor.contact.website}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="text-lg font-medium mb-2">Location</h4>
                  <p className="text-gray-600">{distributor.location}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DistributorDetailsModal;
