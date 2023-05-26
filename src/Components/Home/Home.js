import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useSelector } from "react-redux";
import { mailAction } from "../Store";
const Home = () => {
  const sendermail = useSelector((state) => state.mail.mail);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  function SubmitHandler(event) {
    const receptintemail = event.target.elements.email.value;
    const subject = event.target.elements.subject.value;

    event.preventDefault();
    fetch(
      "https://mail-box-client-7a179-default-rtdb.firebaseio.com/mail.json",
      {
        method: "POST",
        body: JSON.stringify({
          receptintemail: receptintemail,
          sendermail: sendermail,
          subject: subject,
          content: JSON.stringify(editorState.getCurrentContent().toJS),
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {});
      } else {
        res.json.then((data) => {
          throw new Error(data.error.message);
        });
      }
    });
  }
  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <label htmlFor="mail">To</label>
        <input type="email"></input>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" />
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        <button type="submit"> Send</button>
      </form>
    </div>
  );
};
export default Home;
