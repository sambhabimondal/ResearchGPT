import { useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadBox from "./components/UploadBox";
import QuestionInput from "./components/QuestionInput";
import ResponseCard from "./components/ResponseCard";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState("");

  const [uploading, setUploading] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  async function uploadPDF() {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const uploadResponse = await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("PDF upload failed");
      }

      setUploaded(true);

      setResponse(
        "✅ Your research paper is ready. Ask me anything about it!"
      );

    } catch (error) {
      console.error(error);

      setResponse(
        "❌ PDF upload failed. Please make sure the backend is running."
      );

    } finally {
      setUploading(false);
    }
  }


  async function askAI() {
    if (!question || !uploaded) return;

    setResponse("⏳ Searching the research paper...");

    try {
      const askResponse = await fetch(
        `${API_URL}/ask?query=${encodeURIComponent(question)}`
      );

      if (!askResponse.ok) {
        throw new Error("AI request failed");
      }

      const data = await askResponse.json();

      setResponse(data.answer);

    } catch (error) {
      console.error(error);

      setResponse(
        "❌ Something went wrong while generating the answer."
      );
    }
  }


  return (
    <div className="min-h-screen bg-slate-950">

      <Header />

      <Hero />

      <UploadBox
        selectedFile={selectedFile}
        setSelectedFile={(file) => {
          setSelectedFile(file);
          setUploaded(false);
          setResponse("");
        }}
        onUpload={uploadPDF}
        uploading={uploading}
        uploaded={uploaded}
      />

      <QuestionInput
        question={question}
        setQuestion={setQuestion}
        askAI={askAI}
        disabled={!uploaded}
      />

      <ResponseCard response={response} />

    </div>
  );
}

export default App;