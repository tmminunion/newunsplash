export default async function DownloadImage(e, setDisableLink) {
  e.preventDefault();
  var text = e.target.href;
  setDisableLink(true);
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
