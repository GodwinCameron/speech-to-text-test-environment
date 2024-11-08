import OpenAI from "openai";
import { completeChat } from "./completeChat";
import { transcribeAudio } from "./transcribeAudio";

export const stopRecording = async (
  mediaRecorderRef,
  audioChunksRef,
  audioURL,
  setAudioURL,
  Testing_dont_use_tokens,
  setAutoPlay,
  setOptions,
  setHudInterface,
  setDocs
) => {
  mediaRecorderRef.current.stop();
  // <---- Wait for the media recorder to fully stop before creating the blob
  mediaRecorderRef.current.onstop = async () => {
    // Combine audio chunks into a single Blob
    const audioBlob = new Blob(audioChunksRef.current, {
      type: "audio/webm",
    });

    const audioURL = URL.createObjectURL(audioBlob);
    setAudioURL(audioURL);
    //   document.getElementById("audioPlayback").src = audioURL;

    
    // Send the recorded audio to the OpenAI API for transcription
    const transcriptionResult = await transcribeAudio(
      audioBlob,
      Testing_dont_use_tokens,
      setAutoPlay,
      setOptions,
      setHudInterface,
      setDocs
    );
    audioChunksRef.current = [];

    //   setTranscription(transcriptionResult);
  };
};