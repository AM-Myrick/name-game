import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Employee from "../Models/Employee";

interface IDisabledCardProps {
  employee: Employee;
  classes: Record<
    "card" | "hidden" | "cardTitle" | "cardText" | "media" | "incorrect",
    string
  >;
}

const DisabledCard: React.FC<IDisabledCardProps> = props => {
  const { classes, employee } = props;
  const { firstName, lastName, jobTitle } = employee;
  const { url, alt } = employee.headshot;
  const employeeName = `${firstName} ${lastName}`;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={url} title={alt} />
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.cardTitle}>
            {employeeName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.cardText}
          >
            {jobTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DisabledCard;
