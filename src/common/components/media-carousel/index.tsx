import { FunctionalComponent } from "preact";

import styles from "./styles.module.css";
import { useState } from "preact/hooks";

export const MediaCarousel: FunctionalComponent<{
  media: MediaAttachment[];
}> = (props) => {
  const [imagePreview, setImagePreview] = useState<MediaAttachment>();

  return (
    <div className={styles.carousel}>
      {props.media.map((media) => {
        if (media.type === "image" || media.type === "gifv") {
          const text = media.description ?? "media without description";
          return (
            <img
              onClick={() => setImagePreview(media)}
              className={[
                styles.image,
                media.description ? "" : styles["no-description"],
              ].join(" ")}
              src={media.preview_url}
              alt={text}
              title={text}
            />
          );
        }

        if (media.type === "video") {
          return (
            <video
              controls
              allowFullScreen
              className={[
                styles.video,
                media.description ? "" : styles["no-description"],
              ].join(" ")}
              src={media.url}
              poster={media.preview_url}
            >
              {media.description}
              {media.remote_url && (
                <a href={media.remote_url}>Download Video</a>
              )}
            </video>
          );
        }

        if (media.type === "audio") {
          return (
            <audio controls src={media.url}>
              {media.description}
              {media.remote_url && (
                <a href={media.remote_url}>Download Audio</a>
              )}
            </audio>
          );
        }
      })}
      {imagePreview && (
        <div
          onClick={() => setImagePreview(undefined)}
          className={styles.backdrop}
        >
          <img
            alt={imagePreview.description ?? "image"}
            src={imagePreview.preview_url}
          />
        </div>
      )}
    </div>
  );
};
