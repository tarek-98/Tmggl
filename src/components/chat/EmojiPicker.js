import React, { useState } from "react";
import { Picker } from "emoji-mart";

const EmojiPicker = ({ onSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    onSelect(emoji.native);
    setShowPicker(false);
  };

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>😊</button>
      {showPicker && <Picker onSelect={handleEmojiSelect} />}
    </div>
  );
};

export default EmojiPicker;
