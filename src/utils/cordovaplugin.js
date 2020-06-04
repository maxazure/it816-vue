function CreatMedia(url) {
  // Play the audio file at url
  return new Media(url);
}

function CreatRecordMedia(url, onSuccess, onError) {
  // Play the audio file at url
  return new Media(url, onSuccess, onError);
}
export { CreatMedia };
