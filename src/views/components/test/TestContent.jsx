"use client";
import { memo, useState, useCallback } from "react";
import styles from "../../../assets/styles/test/testContent.module.scss";
import bullseye from "../../../assets/icons/bullseye.png";
import user from "../../../assets/icons/user.png";
import Image from "next/image";

const questionData = [
  {
    id: 1,
    question: "What Is The Powerhouse Of The Cell?",
    options: [
      { id: "A", text: "Nucleus" },
      { id: "B", text: "Ribosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Golgi Apparatus" },
    ],
  },
  {
    id: 2,
    question: "What Is The Powerhouse Of The Cell?",
    options: [
      { id: "A", text: "Nucleus" },
      { id: "B", text: "Ribosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Golgi Apparatus" },
    ],
  },
  {
    id: 3,
    question: "What Is The Powerhouse Of The Cell?",
    options: [
      { id: "A", text: "Nucleus" },
      { id: "B", text: "Ribosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Golgi Apparatus" },
    ],
  },
  {
    id: 4,
    question: "What Is The Powerhouse Of The Cell?",
    options: [
      { id: "A", text: "Nucleus" },
      { id: "B", text: "Ribosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Golgi Apparatus" },
    ],
  },
  {
    id: 5,
    question: "What Is The Powerhouse Of The Cell?",
    options: [
      { id: "A", text: "Nucleus" },
      { id: "B", text: "Ribosome" },
      { id: "C", text: "Mitochondria" },
      { id: "D", text: "Golgi Apparatus" },
    ],
  },
];

const TestContent = () => {
  const [info, setInfo] = useState({
    answers: {},
    questions: questionData || [],
  });

  const handleOptionSelect = useCallback((selectedOptiondata, questionInfo) => {
    setInfo((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionInfo?.id]: selectedOptiondata,
      },
    }));
  }, []);

  console.log("answers", info?.answers);

  return (
    <div className={styles.testContentParentContainer}>
      {/* test header */}
      <div className={styles.testHeaderContainer}>
        <div className={styles.testHeaderContentContainer}>
          <Image src={bullseye} alt="target" />
          <span className={styles.testHeadertextStyling}>
            Biology - chapter 22: Evolution
          </span>
        </div>
        <Image src={user} alt="user" />
      </div>

      {/* question content */}
      <div className={styles.questionParentContainer}>
        {info?.questions?.map((ele, index) => (
          <div className={styles.questionContainer} key={ele.id}>
            <span className={styles.questionNumber}>
              Question {index + 1} of {info?.questions?.length}
            </span>
            <h2 className={styles.questionText}>{ele?.question || ""}</h2>

            <div className={styles.optionsContainer}>
              {ele?.options?.map((option) => (
                <label
                  key={option.id}
                  className={`${styles.optionItem} ${
                    info?.answers?.[ele?.id] === option.id
                      ? styles.selected
                      : ""
                  }`}
                >
                  <div className={styles.radioContainer}>
                    <input
                      type="radio"
                      name={`question_${ele.id}`}
                      value={option.id}
                      checked={info?.answers?.[ele?.id] === option.id}
                      onChange={() => handleOptionSelect(option.id, ele)}
                    />
                    <div className={styles.radioCustom} />
                  </div>
                  <span>
                    {option.id}) {option.text}
                  </span>
                </label>
              ))}
            </div>

            <button className={styles.dontKnowButton}>Don't know?</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(TestContent);
