import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatFileSize(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  return dotIndex >= 0 ? fileName.slice(dotIndex).toLowerCase() : "";
}

function validateFile(file) {
  if (!file) return "Please select a resume file.";

  const extension = getFileExtension(file.name);
  const hasAllowedExtension = ALLOWED_EXTENSIONS.includes(extension);
  const hasAllowedMimeType = ALLOWED_MIME_TYPES.includes(file.type);

  if (!hasAllowedExtension || (file.type && !hasAllowedMimeType)) {
    return "Only PDF, DOC, and DOCX files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File is too large. Please upload a file up to 5 MB.";
  }

  return "";
}

export function FileUpload({ onFileChange }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (pickedFiles) => {
    const nextFile = pickedFiles?.[0];
    const validationError = validateFile(nextFile);

    if (validationError) {
      setFile(null);
      setError(validationError);
      return;
    }

    setFile(nextFile);
    setError("");
    onFileChange?.({
      fileName: nextFile.name,
      fileSize: formatFileSize(nextFile.size),
      fileType: nextFile.type || getFileExtension(nextFile.name),
      uploadedAt: new Date().toISOString(),
    });
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const resetFile = () => {
    setFile(null);
    setError("");
    onFileChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="stack">
      <button
        className={`upload-zone${isDragging ? " drag-active" : ""}${file ? " upload-success" : ""}`}
        type="button"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <span className="upload-icon"><UploadCloud size={28} /></span>
        <strong>{file ? "Resume uploaded successfully" : "Drop your resume here or click to upload"}</strong>
        <span>PDF, DOC, or DOCX up to 5 MB</span>
      </button>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleInputChange}
      />

      {error && <p className="upload-error">{error}</p>}

      {file && (
        <div className="upload-file">
          <FileText size={22} />
          <div>
            <strong>{file.name}</strong>
            <p>{formatFileSize(file.size)} · Resume uploaded and ready for AI analysis</p>
          </div>
          <button type="button" className="icon-btn" onClick={resetFile} aria-label="Remove uploaded resume">
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
