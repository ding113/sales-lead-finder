// src/pages/About.tsx
import React from "react";
import Layout from "../components/Layout";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          About SalesLeadFinder
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Project Overview
          </h2>
          <p className="text-gray-600 mb-4">
            SalesLeadFinder is an innovative B2B distributor matching platform
            designed to address the challenges faced by foreign trade companies
            in expanding international business. In today's rapidly evolving
            global trade landscape, traditional methods of finding distributors
            often rely on manual searches through search engines and social
            networks, which are not only time-consuming and laborious but also
            yield scattered and unreliable information. This inefficient process
            not only hinders business growth but also increases operational
            risks due to the difficulty in verifying information authenticity.
          </p>
          <p className="text-gray-600 mb-4">
            Our platform develops solutions by deeply understanding market pain
            points. Targeting several key issues commonly faced by foreign trade
            companies: lack of a centralized, real-time distributor information
            database; difficulty in verifying the authenticity of available
            information; and the high costs of existing B2B directory solutions.
            These challenges are particularly prominent for small and
            medium-sized enterprises with limited resources and technical
            expertise.
          </p>
          {/* <img src="/images/project-overview.png" alt="Project Overview" className="w-full mt-4" /> */}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Development Methodology
          </h2>
          <p className="text-gray-600 mb-4">
            During the project development process, we adopted an incremental
            development model combined with agile methodologies to achieve
            better customer feedback integration. This hybrid approach allows us
            to maintain a clear project direction while being flexible in
            responding to changing requirements. Our development process is
            divided into the following key stages:
          </p>
          <p className="text-gray-600 mb-4">
            First, we conducted comprehensive foundational requirements
            gathering and analysis, identifying core features such as user
            authentication and basic search capabilities. The design phase
            included database modeling, API endpoint design, and initial user
            interface design. We chose to adopt a modern client-server
            architecture, achieving front-end and back-end separation, a
            decision based on considerations of system flexibility and future
            scalability.
          </p>
          <p className="text-gray-600 mb-4">
            Throughout the development process, we continuously updated and
            maintained specification documents to reflect new requirements and
            design changes. Parallel development of multiple incremental
            versions improved development efficiency, while continuous testing
            ensured overall system stability. This approach allows us to quickly
            adapt to changing requirements while maintaining high-quality
            standards.
          </p>
        </section>

        <section className="mb-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              System Architecture
            </h2>
            <p className="text-gray-600 mb-4">
              SalesLeadFinder adopts a modern architecture based on the MVC
              design pattern. The frontend is built with React and TypeScript,
              enabling a component-based user interface; the backend uses the
              Spring Boot framework to provide stable API services; the data
              layer leverages PostgreSQL paired with Redis caching to ensure
              high performance.
            </p>
            <p className="text-gray-600 mb-4">
              In terms of data collection, we have implemented a multi-source
              data strategy. Primarily relying on the Google Programmable Search
              Engine API to obtain high-quality search results, we have also
              developed a dedicated crawler system to maintain the RAG corpus.
              The crawler uses a Dockerized headless Chrome browser and strictly
              adheres to the robots.txt protocol. To ensure data quality, we
              have also established a manual data collection process, recording
              distributor information in a standardized CSV format.
            </p>
            <p className="text-gray-600 mb-4">
              The system's search functionality integrates the MeiliSearch
              search engine, achieving efficient full-text search. The user
              interface is inspired by Google's design, emphasizing simplicity
              and ease of use while providing advanced filtering capabilities.
              We have also integrated AI technology to generate search result
              summaries, helping users quickly understand information.
            </p>
          </div>
          <div>
            <img
              src="/system-structure.jpg"
              alt="System Architecture"
              className="w-full"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Quality Assurance
          </h2>
          <p className="text-gray-600 mb-4">
            We have established a comprehensive quality assurance system,
            including unit testing, integration testing, and system testing.
            Front-end testing is conducted using Jest, while back-end testing
            uses JUnit to ensure code quality. Performance testing is carried
            out using JMeter to verify system performance under high
            concurrency.
          </p>
          <p className="text-gray-600 mb-4">
            Security design includes a complete identity authentication system,
            data transmission encryption, and access control. All API calls are
            encrypted via HTTPS, and rate limiting is implemented to prevent
            abuse. Database access is restricted by a whitelist to minimize the
            attack surface.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Technical Innovation and Features
          </h2>
          <p className="text-gray-600 mb-4">
            One of the major innovations of the project is the implementation of
            an intelligent search algorithm. We have developed a relevance-based
            ranking system that optimizes search results by combining user
            behavior data. The system can understand industry-specific terms and
            provide intelligent search suggestions.
          </p>
          <p className="text-gray-600 mb-4">
            In terms of data processing, we have implemented automated data
            cleaning and normalization processes. Machine learning algorithms
            are used to identify and merge duplicate information, ensuring data
            quality. The system can also automatically detect and flag
            potentially outdated information, prompting updates.
          </p>
          <p className="text-gray-600 mb-4">
            The user interface adopts a responsive design, perfectly adapting to
            different devices. We have implemented an advanced state management
            system using Context API and Redux to handle complex application
            states. The addition of animation effects enhances the user
            experience while maintaining performance balance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Future Prospects
          </h2>
          <p className="text-gray-600 mb-4">
            Looking ahead, we plan to further enhance the platform's AI
            capabilities by introducing more advanced natural language
            processing technologies to improve the search experience. We also
            plan to develop API interfaces to allow third-party applications to
            integrate our services.
          </p>
          <p className="text-gray-600 mb-4">
            On the technical front, we will continue to optimize the system
            architecture, considering a migration to a fully containerized
            microservices architecture to improve system scalability.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
