import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailAction, dataAction } from "../Store";

const Inbox = () => {
  const dispatch = useDispatch();
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
        const filteredData = Object.entries(data)
          .map(([id, mail]) => ({
            id,
            ...mail,
          }))
          .filter((mail) => mail.recipientEmail === userMail);
        setMailData(filteredData);
        dispatch(dataAction.setMailData(filteredData));
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

  function deleteHandler(mailId) {
    fetch(
      `https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail/${mailId}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          dispatch(dataAction.deletedata({ mailId }));
          // Remove the deleted mail from the local state
          setMailData((prevMailData) =>
            prevMailData.filter((mail) => mail.id !== mailId)
          );
          res.json().then((data) => console.log(data));
        } else {
          throw new Error("Failed to delete mail");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  return (
    <div>
      {mailData && mailData.length > 0 ? (
        <ul>
          {mailData.map((mail) => (
            <li
              key={mail.id}
              style={{ fontWeight: mail.read ? "normal" : "bold" }}
            >
              <p>From: {mail.senderMail || "Not in your list"}</p>
              <p>Subject: {mail.subject}</p>
              <div>{renderContent(mail.content)}</div>
              <button onClick={() => deleteHandler(mail.id)}>Delete</button>
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
