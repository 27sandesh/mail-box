import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Inbox = () => {
  const [mailData, setMailData] = useState(null);
  const userMail = useSelector((state) => state.mail.mail);
  const senderMail = useSelector((state) => state.data.senderMail);

  useEffect(() => {
    fetch("https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch emails");
        }
      })
      .then((data) => {
        const filteredData = Object.values(data).filter(
          (mail) => mail.recipientEmail === userMail
        );
        setMailData(filteredData);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [userMail, senderMail]);

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

  return (
    <div>
      {mailData && mailData.length > 0 ? (
        <ul>
          {mailData.map((mail) => (
            <li key={mail.id}>
              <p>From: {mail.senderMail || "Not in your list"}</p>
              <p>Subject: {mail.subject}</p>
              <div>{renderContent(mail.content)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default Inbox;
