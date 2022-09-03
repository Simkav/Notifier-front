import AlertAdapter from "../../ComponentAdapters/AlertAdapter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import React, { FC, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import copy from "clipboard-copy";
import css from "./index.module.scss";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Icons } from "../Icons";
import { botName, connectionLinks, connectionsVariation } from "./constants";

type Props = {
  descriptionFor: connectionsVariation;
  code: string;
  mail: string;
  handleClick: (panel: connectionsVariation) => void;
  activePanel: connectionsVariation | null;
};

const ContactUs = () => (
  <a href={"mailto:erobel0@mail.ru"} rel="noreferrer" target={"_blank"}>
    Our Email
  </a>
);

const ConnectionDescription: FC<Props> = ({
  activePanel,
  handleClick,
  descriptionFor,
  code,
  mail,
}) => {
  const [isOpenAlert, setOpenAlert] = useState<boolean>(false);

  const handleCopy = async (code: string) => {
    await copy(`/register ${code}`).then((_) => setOpenAlert(true));
  };

  return (
    <>
      <Accordion disableGutters expanded={activePanel === descriptionFor}>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
          onClick={() => handleClick(descriptionFor)}
        >
          <p className={css.emphasise}>
            {descriptionFor} <Icons panel={descriptionFor} />
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <div className={css.container}>
            {descriptionFor !== connectionsVariation.Mail ? (
              <>
                <p>
                  Click on this icon and go to the app,where you will see
                  our&nbsp;
                  <a
                    className={css.emphasise}
                    href={connectionLinks[descriptionFor]}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {botName[descriptionFor]}
                  </a>
                </p>
                <p>
                  Copy this phrase&nbsp;&nbsp;
                  <Tooltip TransitionComponent={Fade} title="Copy">
                  <span
                    className={css.emphasise}
                    onClick={() => handleCopy(code)}
                  >
                    /register {code}
                  </span>
                    </Tooltip>
                  &nbsp;&nbsp;and send it to our {botName[descriptionFor]}
                </p>
                <p>
                  Your code have 1 hour limit, after that we will give you new
                  one
                </p>
                <p>
                  If all goes well, our bot will connect your notifications with
                  this account
                  <br />
                  <span className={css.underlineText}>
                    (Else write us by&nbsp;
                    <ContactUs />
                  </span>
                  )
                </p>
                <p>Enjoy!</p>
              </>
            ) : (
              <>
                <p>
                  To get notification on your email you should click on link,
                  which we sent to <span className={css.emphasise}>{mail}</span>
                  <br />
                  <span className={css.underlineText}>
                    (If you did not get message check your email address or
                    contact us by&nbsp;
                    <ContactUs />)
                  </span>
                </p>
              </>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <AlertAdapter
        message={"Copied successfully!"}
        open={isOpenAlert}
        setOpenAlert={setOpenAlert}
        severity={"success"}
      />
    </>
  );
};

export default ConnectionDescription;
