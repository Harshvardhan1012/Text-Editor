import React, { useEffect, useState } from "react";
import ToggleButton from "./Button";

const Draft = () => {
  const [isEditorActive, setIsEditorActive] = useState(true);
  const [saved, isSaved] = useState(false);
  const [lines, setLines] = useState([
    {
      text: "",
      isHeading: false,
      isRed: false,
      isBold: false,
      isUnderline: false,
    },
  ]);

  useEffect(() => {
    const storedLines = localStorage.getItem("line");
    if (storedLines) {
      setLines(JSON.parse(storedLines));
    }
    if (isSaved) {
      setTimeout(() => {
        isSaved(false);
      }, 3000);
    }
  }, [saved]);
  const handleChange = (e) => {
    const updatedLines = e.target.value.split("\n").map((line, index) => {
      const existingLine = lines[index] || {};
      return {
        text: line,
        isHeading: existingLine.isHeading || false,
        isRed: existingLine.isRed || false,
        isBold: existingLine.isBold || false,
        isUnderline: existingLine.isUnderline || false,
      };
    });

    setLines(updatedLines);
  };

  const handleLines = (
    currentIndex,
    currentLine,
    red,
    bold,
    heading,
    underline
  ) => {
    setLines((lines) => {
      lines[currentIndex] = {
        text: currentLine.text,
        isRed: red ?? false,
        isBold: bold ?? false,
        isHeading: heading ?? false,
        isUnderline: underline ?? false,
      };
      return [...lines];
    });
  };

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const cursorPosition = textarea.selectionStart;
    let cumulativeLength = 0;
    let currentIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      cumulativeLength += lines[i].text.length + 1;
      if (cursorPosition <= cumulativeLength) {
        currentIndex = i;
        break;
      }
    }
    const currentLine = lines[currentIndex];
    if (currentLine.text.startsWith("*** ")) {
      handleLines(currentIndex, currentLine, false, false, false, true);
    } else if (currentLine.text.startsWith("** ")) {
      handleLines(currentIndex, currentLine, true);
    } else if (currentLine.text.startsWith("* ")) {
      handleLines(currentIndex, currentLine, false, true);
    } else if (currentLine.text.startsWith("# ")) {
      handleLines(currentIndex, currentLine, false, false, true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      setLines((prevLines) => [
        ...prevLines,
        {
          text: "",
          isHeading: false,
          isRed: false,
          isBold: false,
          isUnderline: false,
        },
      ]);
    } else {
      handleLines(currentIndex, currentLine);
    }
  };

  const saveToLocal = () => {
    localStorage.setItem("line", JSON.stringify(lines));
    isSaved(true);
  };

  const renderContent = () => {
    return lines.map((line) => line.text).join("\n");
  };

  function formatText(line) {
    if (line.isHeading || line.isBold) {
      return line.text.slice(2);
    } else if (line.isRed) {
      return line.text.slice(3);
    } else if (line.isUnderline) {
      return line.text.slice(4);
    }
    return line.text;
  }

  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <div className="flex justify-between w-3/4 items-start ">
        <div>
          <ToggleButton
            isActive={isEditorActive}
            color="blue"
            label="Editor"
            onClick={() => setIsEditorActive(true)}
          />
          <ToggleButton
            isActive={!isEditorActive}
            label="Preview"
            color="blue"
            onClick={() => setIsEditorActive(false)}
          />
        </div>
        <ToggleButton label="Save" color="red" isActive onClick={saveToLocal} />
      </div>
      {isEditorActive ? (
        <textarea
          spellCheck={false}
          value={renderContent()}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter text here"
          className="w-3/4 h-96 p-4 text-sm border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      ) : (
        <div className="w-3/4 h-96 p-4 overflow-auto border rounded-lg bg-white border-gray-300">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.isHeading ? "text-2xl font-bold" : "text-base"
              } ${line.isBold ? "font-bold" : ""} ${
                line.isRed ? "text-red-500" : "text-black"
              } ${line.isUnderline ? "underline" : ""}`}
            >
              {formatText(line)}
            </div>
          ))}
        </div>
      )}
      {saved && (
        <div className="text-green-500 font-bold text-xl p-4">
          Saved Successfully
        </div>
      )}
    </div>
  );
};

export default Draft;
