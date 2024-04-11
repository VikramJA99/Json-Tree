import React, { useState } from "react";
import ReactJson from "react-json-view";
import "./App.css";

function App() {
  const [jsonData1, setJsonData1] = useState("");
  const [jsonData2, setJsonData2] = useState("");
  const [selectedValue1, setSelectedValue1] = useState<any>(null);
  const [selectedValue2, setSelectedValue2] = useState<any>(null);
  const [mappedPairs, setMappedPairs] = useState<{ label: any; value: any }[]>(
    []
  );
  const [currentSelection, setCurrentSelection] = useState<string>("");

  const handleInputChange1 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData2(e.target.value);
  };

  const handleItemClick1 = (value: any) => {
    console.log("Clicked value in Tree 1:", value);
    setSelectedValue1(value);
    updateCurrentSelection(value, selectedValue2);
  };

  const handleItemClick2 = (value: any) => {
    console.log("Clicked value in Tree 2:", value);
    setSelectedValue2(value);
    updateCurrentSelection(selectedValue1, value);
  };

  const updateCurrentSelection = (value1: any, value2: any) => {
    if (value1 && value2) {
      setCurrentSelection(
        `"${value1.name}":"${value1.value}" --> "${value2.name}":"${value2.value}"`
      );
    }
  };
  const mapValues = () => {
    if (selectedValue1 && selectedValue2) {
      const mappedPair = { label: selectedValue1, value: selectedValue2 };
      setMappedPairs([...mappedPairs, mappedPair]);
      console.log("Mapped Pairs:", mappedPairs);
    }
  };

  return (
    <div>
      <div className="text-area-container">
        <div className="text-area">
          <h2>Tree 1</h2>
          <textarea
            rows={10}
            cols={50}
            value={jsonData1}
            onChange={handleInputChange1}
            placeholder="Enter JSON data 1 here"
          />
        </div>
        <div className="text-area">
          <h2>Tree 2</h2>
          <textarea
            rows={10}
            cols={50}
            value={jsonData2}
            onChange={handleInputChange2}
            placeholder="Enter JSON data 2 here"
          />
        </div>
      </div>
      <div className="container">
        {jsonData1 && (
          <div className="json-tree">
            <h2>JSON Tree Structure 1</h2>
            <ReactJson
              src={JSON.parse(jsonData1)}
              shouldCollapse={() => false}
              theme="bright"
              collapseStringsAfterLength={false}
              displayDataTypes={false}
              enableClipboard={false}
              iconStyle="square"
              style={{ cursor: "pointer" }}
              onSelect={handleItemClick1}
            />
          </div>
        )}
        {jsonData2 && (
          <div className="json-tree">
            <h2>JSON Tree Structure 2</h2>
            <ReactJson
              src={JSON.parse(jsonData2)}
              shouldCollapse={() => false}
              theme="bright"
              collapseStringsAfterLength={false}
              displayDataTypes={false}
              enableClipboard={false}
              iconStyle="square"
              style={{ cursor: "pointer" }}
              onSelect={handleItemClick2}
            />
          </div>
        )}
      </div>
      {/* Display mapped output */}
      <div>
        <h2>Mapped Output:</h2>
        {mappedPairs.map((pair, index) => (
          <p key={index}>
            {`"${pair.label.name}":"${pair.label.value}" --> "${pair.value.name}":"${pair.value.value}"`}
          </p>
        ))}
      </div>

      <div>
        <h2>Current Selection:</h2>
        {currentSelection && <p>{currentSelection}</p>}
      </div>

      <button onClick={mapValues}>Map Values</button>
    </div>
  );
}

export default App;
