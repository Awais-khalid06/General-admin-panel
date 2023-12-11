import { toast } from "react-toastify";

export const GreenNotify = (text) => {
  toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const RedNotify = (text) => {
  toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
  });
};

export const upload = (cb, setIsLoading) => (evt) => {
  const files = evt.target.files;
  const file = files[0];

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU1YWQ5Y2ZjN2JlZjE3ZjFkOTkxNCIsImlhdCI6MTY4MTEyMDU0NCwiZXhwIjoxNjg4ODk2NTQ0fQ.MwVbniYhtKpSyleEJwCJ_z6GKP9wlg4JEszWOIbOTsU"
  );

  var formdata = new FormData();
  formdata.append("file", file);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  setIsLoading(true);
  fetch(
    "https://rxje2xzpme.us-east-1.awsapprunner.com/api/v1/user/upload",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const url = data.url;
      setIsLoading(false);
      cb(url);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log("error", error);
    });
};
