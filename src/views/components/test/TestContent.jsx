"use client";
import { memo, useState, useCallback, useEffect, useMemo } from "react";
import styles from "../../../assets/styles/test/testContent.module.scss";
import bullseye from "../../../assets/icons/bullseye.png";
import user from "../../../assets/icons/user.png";
import Image from "next/image";
import hourglass from "../../../assets/svg/test/hourglass.svg";
import questionMark from "../../../assets/svg/test/questionMark.svg";
import rightArrow from "../../../assets/svg/test/right-arrow.svg";

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
    activeStage: "stage1", //stage1,stage2
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

  const handleFinishTest = useCallback(() => {
    setInfo((prev) => ({ ...prev, activeStage: "stage2" }));
  }, [info]);

  const stageMapper = useMemo(() => {
    return {
      stage1: (
        <Stage1
          info={info}
          handleOptionSelect={handleOptionSelect}
          handleFinishTest={handleFinishTest}
        />
      ),
      stage2: <Stage2 />,
    };
  }, [info, handleFinishTest, handleOptionSelect]);

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
      </div>

      {stageMapper?.[info?.activeStage]}
    </div>
  );
};

export default memo(TestContent);

const Stage1 = ({ info, handleOptionSelect, handleFinishTest }) => {
  const [timer, setTimer] = useState({
    minutes: 15,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(interval);
          // Handle timer completion (e.g., auto-submit)
          return prev;
        }

        if (prev.seconds === 0) {
          return {
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        }

        return {
          ...prev,
          seconds: prev.seconds - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className={styles.timeDetailsContainer}>
        <div className={styles.timerContainer}>
          <Image src={hourglass} /> Time left:
          <div className={styles.timer}>
            <span>{String(timer.minutes).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(timer.seconds).padStart(2, "0")}</span>
          </div>
        </div>
        <button onClick={handleFinishTest} className={styles.finishButton}>
          Finish Test
        </button>
      </div>
      <div className={styles.questionParentContainer}>
        {info?.questions?.map((ele, index) => (
          <div className={styles.questionContainer} key={ele.id}>
            <span className={styles.questionNumber}>
              <Image src={questionMark} /> Question {index + 1} of{" "}
              {info?.questions?.length}
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
    </>
  );
};

const Stage2 = () => {
  const stats = {
    score: 40,
    correct: 4,
    incorrect: 6,
    avgTime: "4 mins",
    longestQuestions: ["Q. 6", "Q. 8"],
    timeCompleted: {
      hours: "00",
      minutes: "18",
      seconds: "54",
    },
  };

  return (
    <div className={styles.stage2ParentContainer}>
      {/* <div className={styles.breadcrumb}>
        <span>Module 3</span>
        <span className={styles.separator}>›</span>
        <span>Cinematic Context</span>
        <span className={styles.separator}>›</span>
        <span>Final Quiz</span>
      </div> */}

      <h1 className={styles.headerText}>Don't worry, you'll bounce back!</h1>

      <div className={styles.contentGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quiz Score</h2>
          <div className={styles.score}>{stats.score}%</div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Time Completed</h2>
          <div className={styles.timeDisplay}>
            <span className={styles.timeUnit}>{stats.timeCompleted.hours}</span>
            <span className={styles.separator}>:</span>
            <span className={styles.timeUnit}>
              {stats.timeCompleted.minutes}
            </span>
            <span className={styles.separator}>:</span>
            <span className={styles.timeUnit}>
              {stats.timeCompleted.seconds}
            </span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <a href="#" className={styles.actionLink}>
            <div className={styles.linkContent}>
              <span className={styles.linkTitle}>
                Try Again <Image src={rightArrow} />
              </span>
              <span className={styles.linkDescription}>
                Retake the test to improve your score.
              </span>
            </div>
            {/* <span>›</span> */}
          </a>

          <a href="#" className={styles.actionLink}>
            <div className={styles.linkContent}>
              <div className={styles.warningBadge}>6 Missed item</div>
              <span className={styles.linkTitle}>
                Review your answer <Image src={rightArrow} />
              </span>
              <span className={styles.linkDescription}>
                Go over your answers and get instant AI feedback.
              </span>
            </div>
          </a>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton}>Cancel</button>
        <button className={styles.completeButton}>complete</button>
      </div>
    </div>
  );
};
