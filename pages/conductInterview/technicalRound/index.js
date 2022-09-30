import React, { useEffect, useState } from "react";
import form from "./form.json";
import styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Input from "components/input/input";
import Button from "components/button/button";
import { setFormValues } from "store/actions/action";
import { deepCloneObj } from "utils/services";
import Dropdown from "components/dropdown/dropdown";
import { useRouter } from "next/router";
const TechnicalRound = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const subject = useSelector(
    (state) => state.interviewReducer.conductInterviewForm?.type?.label
  );
  const [formFields, SetFormFields] = useState({});

  useEffect(() => {
    SetFormFields(deepCloneObj(form[subject]));
  }, [subject]);

  let options = [
    { value: 0, label: "No Experience" },
    { value: 1, label: "Theoretical Knowledge" },
    { value: 2, label: "Can code with guidance" },
    { value: 3, label: "Confident hands-on developer" },
  ];

  const handleChange = (val, topicIndex, subTopicIndex, type) => {
    let value = val;
    if (Array.isArray(value) && !value.length) return;
    let initialValue = 0;

    SetFormFields((prevState) => {
      if (type === "score") {
        value = parseInt(val?.[initialValue]?.value);

        prevState["content"][topicIndex]["content"][subTopicIndex].value =
          value;
        const topic = prevState["content"][topicIndex]["content"]?.reduce(
          (a, b) => a + b.value,
          initialValue
        );
        prevState["content"][topicIndex].value = topic;
        const subjectScore = prevState["content"]?.reduce(
          (a, b) => a + b.value,
          initialValue
        );

        prevState.value = subjectScore;
      } else {
        prevState["content"][topicIndex]["content"][subTopicIndex].feedback =
          value;
      }

      return { ...prevState };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newObj = {
      score: formFields.value,
      technicalRound: { [subject]: formFields },
    };
    dispatch(setFormValues(newObj));

    router.push("/conductInterview/finalFeedback");
  };

  return (
    <div className={styles.technicalRound}>
      <div className={styles.technicalRound__headingWrapper}>
        <h2>
          Technical Round -{" "}
          <span className={styles.technicalRound__headingWrapper__score}>
            {subject}
          </span>
        </h2>
        <h2>
          <span className={styles.technicalRound__headingWrapper__score}>
            Total Score
          </span>{" "}
          - <span data-testid="score">{formFields?.value || 0}</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        {formFields?.content?.map((topic, topicIndex) => {
          return (
            <React.Fragment key={topicIndex}>
              <h3 className={styles.technicalRound__subHeading}>
                {topic.label} - {topic.value || 0}
              </h3>
              {topic.content.map((subTopic, subTopicIndex) => (
                <div
                  key={subTopicIndex}
                  className={styles.technicalRound__subTopicWrapper}
                >
                  <p
                    className={styles.technicalRound__subTopicWrapper__question}
                  >
                    {subTopic.question}{" "}
                  </p>

                  <div
                    className={
                      styles.technicalRound__subTopicWrapper__inputField
                    }
                  >
                    <Dropdown
                      options={options}
                      placeholder="Choose Score Type"
                      retriveDropdownValue={(e) =>
                        handleChange(e, topicIndex, subTopicIndex, "score")
                      }
                      name={subTopic.question}
                    />
                    <Input
                      aria-label={subTopic.question}
                      value={subTopic.feedback}
                      placeholder="Enter Feedback"
                      type="text"
                      handleChange={(e) =>
                        handleChange(e, topicIndex, subTopicIndex, "feedback")
                      }
                    />
                  </div>
                </div>
              ))}
            </React.Fragment>
          );
        })}

        <div className={styles.technicalRound__btnWrapper}>
          <Button data-testid="btn" buttonType="solidDefault" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TechnicalRound;
