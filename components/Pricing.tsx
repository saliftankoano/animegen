"use client";
import { twMerge } from "tailwind-merge";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    priceId: "",
    buttonText: "Included",
    popular: false,
    inverse: false,
    features: ["Up to 10 images"],
  },
  {
    title: "Premium",
    monthlyPrice: 10,
    priceId: "price_1Pv3WnB6K2WVrIh2UXXJMBHA",
    buttonText: "Join now!",
    popular: true,
    inverse: true,
    features: ["200 images", "Priority support"],
  },
  {
    title: "Star",
    monthlyPrice: 50,
    priceId: "price_1Pv3cXB6K2WVrIh2hsOMKFsM",
    buttonText: "Join now!",
    popular: false,
    inverse: false,
    features: ["1,000 images", "Priority support"],
  },
];

export const Pricing: React.FC = () => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <section className="py-24 bg-background">
      <div className="cards flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
        {pricingTiers.map(
          (
            {
              title,
              monthlyPrice,
              priceId,
              buttonText,
              popular,
              inverse,
              features,
            },
            key
          ) => (
            <div
              className={twMerge(
                "card",
                inverse == true && "border-black bg-black text-white"
              )}
              key={key}
            >
              <div className="flex justify-between">
                <h3
                  className={twMerge(
                    "text-lg font-bold text-black/50",
                    inverse == true && "text-white/60"
                  )}
                >
                  {title}
                </h3>
                {popular === true && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <motion.span
                      animate={{ backgroundPositionX: "100%" }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                    >
                      Popular
                    </motion.span>
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-1 mt-[30px]">
                <span
                  className={`text-4xl font-bold tracking-tighter leading-none ${
                    inverse == true ? "text-white" : "text-black"
                  }`}
                >
                  ${monthlyPrice}
                </span>
                <span
                  className={`tracking-tight ${
                    inverse == true ? "text-white/50" : "text-black/50"
                  }`}
                >
                  /mo
                </span>
              </div>
              {priceId != "" ? (
                <form
                  action={`/api/checkout_sessions?priceId=${priceId}`}
                  method="POST"
                >
                  <button
                    className={twMerge(
                      "btn btn-primary justify-center w-full mt-[30px]",
                      inverse == true && "bg-white text-black font-bold"
                    )}
                    role="link"
                  >
                    {buttonText}
                  </button>
                </form>
              ) : (
                <button
                  className="btn btn-primary justify-center w-full mt-[30px]"
                  onClick={() => {}}
                >
                  {buttonText}
                </button>
              )}

              <ul className="flex-col gap-5 mt-8">
                {features.map((feature, key) => (
                  <li key={key} className="text-sm flex items-center gap-4">
                    <CheckIcon className="h-6 w-6" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </section>
  );
};
