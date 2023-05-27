import React from "react";
import { dataAction } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const SentBox = () => {
  const dispatch = useDispatch();
  const senderMail = useSelector((state) => state.data.senderMail);
  const userMail = useSelector((state) => state.mail.mail);
  const [mailData, setMailData] = useState(null);

  const renderContent = (content) => {
    if (!content) {
      return null;
    }
    let blocks = [];
    if (Array.isArray(content)) {
      blocks = content;
    } else if (
      typeof content === "object" &&
      content != null &&
      content.hasOwnProperty("blockMap")
    ) {
      blocks = Object.values(content.blockMap);
    } else {
      return null;
    }
    const contentText = blocks.reduce((text, block) => {
      const blockText = block.text.trim();
      if (blockText) {
        text.push(blockText);
      }
      return text;
    }, []);
    return contentText.map((text, index) => <p key={index}>{text}</p>);
  };

  useEffect(() => {
    fetch("https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail.json")
      .then((res) => {
        if (res.ok) {
          return res.json(); // Return the parsed JSON
        } else {
          throw new Error("Failed to load"); // Throw an error object
        }
      })
      .then((data) => {
        const filteredData = Object.entries(data)
          .map(([id, mail]) => ({ id, ...mail }))
          .filter((mail) => mail.senderMail === userMail);
        setMailData(filteredData);
        // dispatch(dataAction.setdata(filteredData));
      })
      .catch((error) => {
        console.error(error); // Handle the error here
      });
  }, [userMail, senderMail]);

  return (
    <div>
      {mailData && mailData.length > 0 ? (
        <ul>
          {mailData.map((mail) => {
            return (
              <li key={mail.id}>
                <p>To: {mail.recipientEmail}</p>
                <p>Subject: {mail.subject}</p>
                <div>{renderContent(mail.content)}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>"NO DATA AVAILABLE"</p>
      )}
    </div>
  );
};

export default SentBox;
