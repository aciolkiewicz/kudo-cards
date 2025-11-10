import Picker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { emojis } from "@/constants/index";

import styles from "./ToolbarTextField.module.css";

interface Properties {
  fieldToManipulate: string;
}

const ToolbarTextField = ({ fieldToManipulate }: Properties) => {
  const [showPicker, setShowPicker] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);
  const { watch, setValue } = useFormContext();

  const forValue = watch(fieldToManipulate);

  useEffect(() => {
    if (!emojis || emojis.length === 0) return;
    if (showPicker) return;

    const id = setInterval(() => {
      setEmojiIndex((i) => (i + 1) % emojis.length);
    }, 150);

    return () => clearInterval(id);
  }, [showPicker]);

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setValue(fieldToManipulate, (forValue ?? "") + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={styles.toolbarContainer}>
      <span
        className={styles.toolPickerButton}
        onClick={() => setShowPicker((prev) => !prev)}>
        {emojis && emojis.length > 0 ? emojis[emojiIndex] : "✨"}
      </span>
      {showPicker && (
        <div className={styles.toolPickerModal}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default ToolbarTextField;
