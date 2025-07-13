"use client";
import { faqDataMain } from "@/data/faqs";
import React, { useEffect, useRef, useState } from "react";

// Define the shape of your FAQ data
interface FaqItem {
  question: string;
  answer: string;
  // Add any other properties your faqData items might have
}

// Define the props for your Faq component
interface FaqProps {
  faqData?: FaqItem[]; // Optional prop, defaults to faqDataMain
}

export default function Faq({ faqData = faqDataMain }: FaqProps) {
  const questionRefs = useRef<HTMLAnchorElement[]>([]);
  const answerRefs = useRef<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    questionRefs.current.forEach((el) => {
      el.classList.remove("active");
    });
    answerRefs.current.forEach((el) => {
      el.style.height = "0px";
      el.style.overflow = "hidden";
      el.style.transition = "all 0.5s ease-in-out";
      el.style.marginBottom = "0px";
    });
    if (currentIndex !== -1) {
      questionRefs.current[currentIndex].classList.add("active");
      const element = answerRefs.current[currentIndex];
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.style.transition = "all 0.5s ease-in-out";
      element.style.marginBottom = "1.55em";
    }
  }, [currentIndex]);

  return (
    <dl className="toggle">
      {faqData.map((item, index) => (
        <React.Fragment key={index}>
          <dt
            onClick={() => {
              setCurrentIndex((prevIndex) =>
                prevIndex === index ? -1 : index
              );
            }}
          >
            {/* Correct way to assign to an array of refs */}
            <a
              ref={(el: HTMLAnchorElement | null) => {
                // Explicitly type 'el' here
                if (el) {
                  // Only add if element exists (on mount)
                  questionRefs.current[index] = el;
                } else {
                  // Remove if element unmounts
                  delete questionRefs.current[index];
                }
              }}
            >
              {item.question}
            </a>
          </dt>
          <dd
            ref={(el: HTMLElement | null) => {
              // Explicitly type 'el' here
              if (el) {
                // Only add if element exists (on mount)
                answerRefs.current[index] = el;
              } else {
                // Remove if element unmounts
                delete answerRefs.current[index];
              }
            }}
            className="black faqAnswer"
          >
            {item.answer}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
