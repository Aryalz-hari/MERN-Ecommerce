import { Cloud, FastForwardIcon, ShoppingBag } from "lucide-react";
import React from "react";

const features = [
  {
    title: "Fast & Reliable",
    description:
      "Our platform ensures lightning-fast performance and 99.9% uptime.",
    icon: <FastForwardIcon/>,
  },

  {
    title: "24/7 Support",
    description:
      "Our support team is available around the clock for assistance.",
    icon:<ShoppingBag/>,
  },
  {
    title: "Cloud Storage",
    description: "Store and access your files securely from anywhere.",
    icon: <Cloud/>,
  },
];

const FeaturesPage = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Features</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
