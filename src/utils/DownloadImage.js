export default async function DownloadImage(e, setDisableLink) {
  e.preventDefault();
  var text = e.target.href;
  setDisableLink(true);

  fetch(e.target.href).then((response) => {
    response
      .arrayBuffer()
      .then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.jpg`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisableLink(false);
      });
  });

  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
