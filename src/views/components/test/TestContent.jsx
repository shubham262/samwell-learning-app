"use client";
import {
  memo,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import styles from "../../../assets/styles/test/testContent.module.scss";
import bullseye from "../../../assets/icons/bullseye.png";
import user from "../../../assets/icons/user.png";
import Image from "next/image";
import hourglass from "../../../assets/svg/test/hourglass.svg";
import questionMark from "../../../assets/svg/test/questionMark.svg";
import rightArrow from "../../../assets/svg/test/right-arrow.svg";
// import questionData from "../../../constants/data";
import { useRouter } from "next/navigation";
import { PieChart, Pie, Cell } from "recharts";
import Context from "@/context/context";

const TestContent = () => {
  const {
    tutorInfo: { questionsData, userQuery },
  } = useContext(Context);
  const [info, setInfo] = useState({
    answers: {},
    questions: [],
    activeStage: "stage1", //stage1,stage2
    score: 0,
    scorePercentage: 0,
    unmarkedQuestions: 0,
    reviewAnswers: false,
    wrongAnswers: 0,
    usedTime: {
      hours: "00",
      minutes: "00",
      seconds: "00",
    },
  });

  useEffect(() => {
    if (questionsData) {
      let answers = {};
      for (const question of questionsData) {
        answers[question?.id] = null;
      }
      setInfo((prev) => ({ ...prev, answers, questions: questionsData }));
    }
  }, [questionsData]);

  useEffect(() => {
    if (info?.activeStage === "stage2") {
      let currentScore = 0;
      let unmarkedQuestions = 0;
      let scorePercentage = 0;
      let wrongAnswers = 0;
      const answers = info?.answers || {};
      for (let i = 0; i < questionsData?.length; i++) {
        if (
          questionsData?.[i]?.correctOption ===
          answers?.[questionsData?.[i]?.id]
        ) {
          currentScore += 1;
        }
        if (!answers?.[questionsData?.[i]?.id]) {
          unmarkedQuestions++;
        }
      }
      scorePercentage = (currentScore / questionsData?.length) * 100;
      setInfo((prev) => ({
        ...prev,
        score: currentScore,
        scorePercentage,
        unmarkedQuestions,
      }));
    }
  }, [info?.activeStage, questionsData]);

  const handleOptionSelect = useCallback((selectedOptiondata, questionInfo) => {
    setInfo((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionInfo?.id]: selectedOptiondata,
      },
    }));
  }, []);

  const handleFinishTest = useCallback(
    (timeDetails) => {
      // Calculate used time

      const initialTimeInSeconds = 15 * 60; // 15 minutes in seconds
      const remainingTimeInSeconds =
        timeDetails.minutes * 60 + timeDetails.seconds;
      const usedTimeInSeconds = initialTimeInSeconds - remainingTimeInSeconds;

      // Convert used time to hours, minutes, seconds
      const hours = Math.floor(usedTimeInSeconds / 3600);
      const minutes = Math.floor((usedTimeInSeconds % 3600) / 60);
      const seconds = usedTimeInSeconds % 60;

      const usedTime = {
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      };

      setInfo((prev) => ({
        ...prev,
        activeStage: "stage2",
        usedTime: prev.reviewAnswers ? prev.usedTime : usedTime,
      }));
    },
    [info]
  );

  const tryAgain = useCallback(() => {
    let answers = {};
    for (const question of info?.questions) {
      answers[question?.id] = null;
    }
    setInfo((prev) => ({
      ...prev,
      answers,
      activeStage: "stage1",
      score: 0,
      scorePercentage: 0,
      unmarkedQuestions: 0,
      reviewAnswers: false,
    }));
  }, [info]);

  const handleReviewAnswers = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      reviewAnswers: true,
      activeStage: "stage1",
    }));
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
      stage2: (
        <Stage2
          info={info}
          handleTryAgain={tryAgain}
          handleReviewAnswers={handleReviewAnswers}
        />
      ),
    };
  }, [
    info,
    handleFinishTest,
    handleOptionSelect,
    tryAgain,
    handleReviewAnswers,
  ]);

  return (
    <div className={styles.testContentParentContainer}>
      {/* test header */}
      <div className={styles.testHeaderContainer}>
        <div className={styles.testHeaderContentContainer}>
          <Image src={bullseye} alt="target" />
          <span className={styles.testHeadertextStyling}>
            {userQuery || ""}
          </span>
        </div>
      </div>

      {stageMapper?.[info?.activeStage]}
    </div>
  );
};

const Stage1 = ({ info, handleOptionSelect, handleFinishTest }) => {
  const [timer, setTimer] = useState({
    minutes: 15,
    seconds: 0,
  });

  const handleFinitTestClick = useCallback(() => {
    handleFinishTest(timer);
  }, [handleFinishTest, timer]);

  useEffect(() => {
    if (info?.reviewAnswers) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(interval);
          // Handle timer completion (e.g., auto-submit)
          handleFinishTest({ minutes: 0, seconds: 0 });
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

  const getOptionStatus = useCallback(
    (question, optionId) => {
      if (!info?.reviewAnswers) return "";

      const userAnswer = info?.answers?.[question.id];
      const correctAnswer = question.correctOption;

      if (!userAnswer) {
        return "unmarked";
      }

      if (optionId === correctAnswer) {
        return "correct";
      }

      if (optionId === userAnswer) {
        return "incorrect";
      }

      return "";
    },
    [info?.reviewAnswers, info?.answers]
  );

  const getAnswerStatusText = useCallback(
    (question, optionId) => {
      if (!info?.reviewAnswers) return null;

      const userAnswer = info?.answers?.[question.id];
      const correctAnswer = question.correctOption;

      if (optionId === correctAnswer) {
        return (
          <span className={`${styles.answerStatus} ${styles.correct}`}>
            Correct Answer
          </span>
        );
      }

      if (optionId === userAnswer && userAnswer !== correctAnswer) {
        return (
          <span className={`${styles.answerStatus} ${styles.incorrect}`}>
            Your Answer
          </span>
        );
      }

      return null;
    },
    [info?.reviewAnswers, info?.answers]
  );

  return (
    <>
      <div
        className={styles.timeDetailsContainer}
        style={{ justifyContent: info?.reviewAnswers ? "flex-end" : "" }}
      >
        {!info?.reviewAnswers && (
          <div className={styles.timerContainer}>
            <Image src={hourglass} alt="target" /> Time left:
            <div className={styles.timer}>
              <span>{String(timer.minutes).padStart(2, "0")}</span>
              <span>:</span>
              <span>{String(timer.seconds).padStart(2, "0")}</span>
            </div>
          </div>
        )}
        {!info?.reviewAnswers ? (
          <button
            onClick={handleFinitTestClick}
            className={styles.finishButton}
          >
            Finish Test
          </button>
        ) : (
          <button
            onClick={handleFinitTestClick}
            className={styles.finishButton}
          >
            Go Back
          </button>
        )}
      </div>
      <div className={styles.questionParentContainer}>
        {info?.questions?.map((ele, index) => (
          //quaestionComponent
          <div className={styles.questionContainer} key={ele.id}>
            <span className={styles.questionNumber}>
              <Image src={questionMark} alt="target" /> Question {index + 1} of{" "}
              {info?.questions?.length}
            </span>
            <h2 className={styles.questionText}>{ele?.question || ""}</h2>

            <div className={styles.optionsContainer}>
              {ele?.options?.map((option) => {
                const status = getOptionStatus(ele, option.id);
                return (
                  <label
                    key={option.id}
                    className={`${styles.optionItem} ${
                      info?.answers?.[ele?.id] === option.id
                        ? styles.selected
                        : ""
                    } ${styles[status]} ${
                      info?.reviewAnswers ? styles.disabled : ""
                    }`}
                  >
                    <div className={styles.radioContainer}>
                      <input
                        type="radio"
                        name={`question_${ele.id}`}
                        value={option.id}
                        checked={info?.answers?.[ele?.id] === option.id}
                        onChange={() => handleOptionSelect(option.id, ele)}
                        disabled={info?.reviewAnswers}
                      />
                      <div className={styles.radioCustom} />
                    </div>
                    <span>
                      {option.id}) {option.text}
                    </span>
                    {getAnswerStatusText(ele, option.id)}
                  </label>
                );
              })}
            </div>

            {!info?.answers?.[ele?.id] && info?.reviewAnswers && (
              <div className={`${styles.answerStatus} ${styles.unmarked}`}>
                Question Unmarked
              </div>
            )}

            {!info?.reviewAnswers && (
              <button className={styles.dontKnowButton}>Don't know?</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const Stage2 = ({ info, handleTryAgain, handleReviewAnswers }) => {
  const router = useRouter();

  const handleComplete = useCallback(() => {
    router.push("/");
  }, [router]);

  // Calculate the actual data for the pie chart
  const totalQuestions = info?.questions?.length || 0;
  const correctAnswers = info?.score || 0;
  const incorrectAnswers =
    totalQuestions - correctAnswers - (info?.unmarkedQuestions || 0);

  const chartData = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: incorrectAnswers },
    { name: "Unmarked", value: info?.unmarkedQuestions || 0 },
  ];

  const COLORS = ["#4CAF50", "#FF5722", "#FFC107"];

  return (
    <div className={styles.stage2ParentContainer}>
      <h1 className={styles.headerText}>
        {info?.scorePercentage > 50
          ? "Great!, you have done well"
          : "Don t worry, you'll bounce back!"}
      </h1>

      <div className={styles.contentGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quiz Score</h2>
          <div className={styles.score}>
            {Math.round(info?.scorePercentage)}%
          </div>

          <div className={styles.chatContainer}>
            <PieChart
              width={120}
              height={120}
              className={"customPieChatStyling"}
            >
              <Pie
                data={chartData}
                cx={60}
                cy={60}
                innerRadius={25}
                outerRadius={35}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={`${styles.label} ${styles.correct}`}>
                  Correct
                </span>
                <div className={styles.value}>{correctAnswers}</div>
              </div>
              <div className={styles.statItem}>
                <span className={`${styles.label} ${styles.incorrect}`}>
                  Incorrect
                </span>
                <div className={styles.value}>{incorrectAnswers}</div>
              </div>
              <div className={styles.statItem}>
                <span className={`${styles.label} ${styles.unmarked}`}>
                  Unmarked
                </span>
                <div className={styles.value}>
                  {info?.unmarkedQuestions || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.timeSection}`}>
          <h2 className={styles.sectionTitle}>Time Completed</h2>
          <div className={styles.timeDisplay}>
            <span className={styles.timeUnit}>{info?.usedTime?.hours}</span>
            <span className={styles.separator}>:</span>
            <span className={styles.timeUnit}>{info?.usedTime?.minutes}</span>
            <span className={styles.separator}>:</span>
            <span className={styles.timeUnit}>{info?.usedTime?.seconds}</span>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.actionLink} onClick={handleTryAgain}>
            <div className={styles.linkContent}>
              <span className={styles.linkTitle}>
                Try Again <Image src={rightArrow} alt="target" />
              </span>
              <span className={styles.linkDescription}>
                Retake the test to improve your score.
              </span>
            </div>
          </div>

          <div
            className={styles.actionLink}
            onClick={handleReviewAnswers}
            style={{ flex: 1 }}
          >
            <div className={styles.linkContent}>
              <div className={styles.warningBadge}>
                {info?.unmarkedQuestions} Missed item
              </div>
              <span className={styles.linkTitle}>
                Review your answer <Image src={rightArrow} alt="target" />
              </span>
              <span className={styles.linkDescription}>
                Go over your answers and get instant AI feedback.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.completeButton} onClick={handleComplete}>
          complete
        </button>
      </div>
    </div>
  );
};

export default memo(TestContent);
