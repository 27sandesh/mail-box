import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertFromRaw } from "draft-js";
import { useSelector, useDispatch } from "react-redux";
import { dataAction } from "../Store";
const Home = () => {
  const dispatch = useDispatch();
  const senderMail = useSelector((state) => state.mail.mail);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  function SubmitHandler(event) {
    event.preventDefault();
    const recipientEmail = event.target.elements.email.value;

    const subject = event.target.elements.subject.value;
    const content = JSON.parse(
      JSON.stringify(editorState.getCurrentContent().toJS())
    );

    const emailData = {
      recipientEmail,
      senderMail,
      subject,
      content,
    };
    dispatch(
      dataAction.setdata({
        recipientEmail,
        senderMail,
        subject,
        content,
      })
    );

    fetch(
      "https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail.json",
      {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to send email");
        }
      })
      .then((data) => {
        console.log("Email sent:", data);
        dispatch(dataAction.setdata(data));
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    fetch(
      "https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail.json",
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch emails");
        }
      })
      .then((data) => {
        console.log("Emails:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <label htmlFor="email">To</label>
        <input type="email" name="email" />
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Home;
