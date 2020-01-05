import React, { Dispatch } from "react";
import DisabledCard from "./DisabledCard";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Employee from "../Models/Employee";

interface IEmployeeCardProps {
  employee: Employee;
  answer: string;
  startNextRound: () => Promise<void>;
  scoreDispatch: Dispatch<{ type: string }>;
  disabled: boolean;
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 320,
    width: "100%",
    margin: "0 auto",
    marginBottom: "10px",
    [theme.breakpoints.up(500)]: {
      width: "calc(50% - 10px)"
    },
    [theme.breakpoints.up(700)]: {
      width: "calc(33% - 10px)"
    },
    [theme.breakpoints.up(1100)]: {
      width: "calc(20% - 10px)"
    }
  },
  cardTitle: {
    minHeight: "64px"
  },
  cardText: {
    minHeight: "40px"
  },
  media: {
    height: 200,
    [theme.breakpoints.up(700)]: {
      height: 320
    }
  },
  hidden: {
    visibility: "hidden"
  },
  incorrect: {
    backgroundColor: "rgba(255,0,0,0.5)"
  }
}));

const EmployeeCard: React.FC<IEmployeeCardProps> = props => {
  const classes = useStyles();
  const { scoreDispatch, startNextRound, disabled, employee, answer } = props;
  const { firstName, lastName, jobTitle } = employee;
  const { url, alt } = employee.headshot;
  const employeeName = `${firstName} ${lastName}`;

  // local state to handle UI updates for incorrect answers and showing names
  const [isCorrectAnswer, setIsCorrectAnswer] = React.useState<null | boolean>(
    null
  );
  const [showName, setShowName] = React.useState<boolean>(false);

  // when a card is clicked, show employee's name and title and increment the appropriate score state
  const handleClick = () => {
    if (employeeName === answer) {
      setShowName(true);
      scoreDispatch({ type: "INCREMENT-CORRECT" });
      startNextRound();
    } else if (employeeName !== answer && showName === false) {
      setShowName(true);
      setIsCorrectAnswer(false);
      scoreDispatch({ type: "INCREMENT-INCORRECT" });
    }
  };

  // when the game is over, show employee names and titles, make clicking no longer affect scores
  if (disabled) {
    return <DisabledCard classes={classes} employee={employee} />;
  }

  // while the game is being played, display a fully interactive card
  return (
    <Card
      className={
        isCorrectAnswer === false
          ? `${classes.card} ${classes.incorrect}`
          : `${classes.card}`
      }
      onClick={() => handleClick()}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={url} title={alt} />
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={
              showName === false
                ? `${classes.hidden} ${classes.cardTitle}`
                : classes.cardTitle
            }
          >
            {employeeName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={
              showName === false
                ? `${classes.hidden} ${classes.cardText}`
                : classes.cardText
            }
          >
            {jobTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div
        className={
          isCorrectAnswer === false ? `${classes.incorrect}` : undefined
        }
      ></div>
    </Card>
  );
};

export default EmployeeCard;
