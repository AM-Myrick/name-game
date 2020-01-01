import React from "react";
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
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 320,
    transition: "border .25s ease-in-out",
    width: "100%",
    margin: "0 auto",
    marginBottom: "20px",
    [theme.breakpoints.up(500)]: {
        width: "calc(50% - 20px)",
    },
    [theme.breakpoints.up(700)]: {
        width: "calc(33% - 20px)"
    },
    [theme.breakpoints.up(1100)]: {
        width: "calc(20% - 20px)"
    },
  },
  media: {
    height: 160,
    [theme.breakpoints.up(700)]: {
        height: 320,
    },
  },
  incorrect: {
    border: "5px solid red"
  },
  hidden: {
    visibility: "hidden"
  }
}));

const EmployeeCard: React.FC<IEmployeeCardProps> = props => {
  const classes = useStyles();
  const { url, alt } = props.employee.headshot;
  const { firstName, lastName, jobTitle } = props.employee;
  const employeeName = `${firstName} ${lastName}`;
  const answer = props.answer;
  const [correctAnswer, setCorrectAnswer] = React.useState<null | boolean>(
    null
  );
  const [showName, setShowName] = React.useState<boolean>(false);

  const handleClick = () => {
    if (employeeName === answer) {
      setShowName(true);
      props.startNextRound();
    } else {
      setShowName(true);
      setCorrectAnswer(false);
    }
  };

  return (
    <Card
      className={
        correctAnswer === false
          ? `${classes.card} ${classes.incorrect}`
          : `${classes.card}`
      }
      onClick={() => handleClick()}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={url} title={alt} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={showName === false ? classes.hidden : undefined}
          >
            {employeeName}
          </Typography>
          <br />
          <Typography variant="body2" color="textSecondary" component="p">
            {jobTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EmployeeCard;
