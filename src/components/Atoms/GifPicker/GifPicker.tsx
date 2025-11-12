import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
} from "@giphy/react-components";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./GifPicker.module.css";

interface Properties {
  setShowGifPicker: (show: boolean) => void;
}

const GifPicker = ({ setShowGifPicker }: Properties) => (
  <SearchContextManager apiKey={process.env.NEXT_PUBLIC_ENV_GIF_API_KEY || ""}>
    <GifGrid setShowGifPicker={setShowGifPicker} />
  </SearchContextManager>
);

const GifGrid = ({ setShowGifPicker }: Properties) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const { setValue } = useFormContext();

  const setGif = (gif: any, event: any) => {
    event?.preventDefault();
    const gifUrl = gif.images.fixed_width.url;
    setValue("gifUrl", gifUrl);
    setShowGifPicker(false);
  };

  return (
    <div className={styles.toolPickerModal}>
      <SearchBar />
      <Grid
        key={searchKey}
        width={350}
        columns={2}
        fetchGifs={fetchGifs}
        hideAttribution={true}
        onGifClick={setGif}
      />
    </div>
  );
};

export default GifPicker;
