import "./share.css";
import axios from "axios";
import { PermMedia } from "@material-ui/icons";
import { useState } from "react";

function Share() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));


  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    console.log(userInfo);
    const formData = new FormData();
    formData.append("desc", input);
    formData.append("photo", file);
    formData.append("userName", userInfo.profileObj.name);
    formData.append("userEmail", userInfo.profileObj.email);
    formData.append("userImg", userInfo.profileObj.imageUrl);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "http://localhost:8000/postupload";
    axios
      .post(url, formData, config)
      .then((res) => {
        console.log(res);
        alert("Post uploaded successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(file);
    setInput("");
    setFile("");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleSubmit}>
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={userData.profileObj.imageUrl}
              alt="user_img"
            />

            <input
              placeholder="Start a post..."
              className="shareInput"
              name="desc"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <input
                  type="file"
                  id="file"
                  name="file"
                  // value={file}
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="file">
                  <PermMedia htmlColor="green" className="shareIcon" />
                  <span className="shareOptionText">Photo/Video</span>
                </label>
              </div>
              {file && <p>{file.name}</p>}
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Share;
