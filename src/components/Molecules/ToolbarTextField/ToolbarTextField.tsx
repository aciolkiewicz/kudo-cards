import Picker, { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import GifPicker from "@/components/Atoms/GifPicker/GifPicker";
import { emojis } from "@/constants/index";

import styles from "./ToolbarTextField.module.css";

interface Properties {
  fieldToManipulate: string;
}

const ToolbarTextField = ({ fieldToManipulate }: Properties) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);
  const { watch, setValue } = useFormContext();

  const forValue = watch(fieldToManipulate);

  useEffect(() => {
    if (!emojis || emojis.length === 0) return;
    if (showEmojiPicker) return;

    const id = setInterval(() => {
      setEmojiIndex((i) => (i + 1) % emojis.length);
    }, 150);

    return () => clearInterval(id);
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setValue(fieldToManipulate, (forValue ?? "") + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <section className={styles.toolbarContainer}>
      <div>
        <span
          className={styles.toolPickerButton}
          onClick={() => setShowEmojiPicker((prev) => !prev)}>
          {emojis && emojis.length > 0 ? emojis[emojiIndex] : "✨"}
        </span>
        {showEmojiPicker && (
          <div className={styles.toolPickerModal}>
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <div>
        <span
          className={styles.toolPickerButton}
          onClick={() => setShowGifPicker((prev) => !prev)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <rect
              x="0.75"
              y="1"
              width="22.5"
              height="22.5"
              rx="5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="12"
              y="15"
              textAnchor="middle"
              fontSize="8"
              fontWeight="700"
              fill="currentColor"
              fontFamily="Arial, Helvetica, sans-serif">
              GIF
            </text>
          </svg>
        </span>
        {showGifPicker && <GifPicker setShowGifPicker={setShowGifPicker} />}
      </div>
    </section>
  );
};

export default ToolbarTextField;
