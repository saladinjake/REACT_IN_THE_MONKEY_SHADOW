import Providers from "../context/Providers";
import NextNprogress from "nextjs-progressbar";

// Import all style files
import "../styles/css/globals.css";
import "../styles/css/image.css";
import "../styles/sass/aside.scss";
import "../styles/sass/mui.scss";
import "../styles/sass/order-details.scss";
import "../styles/sass/product-image-upload.scss";

//import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/sass/richtext.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <>
        <NextNprogress
          color="linear-gradient(90deg, rgba(0,61,89, 0.6) 33%, rgba(67,178,99,1) 67%);"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />

        <Component {...pageProps} />
      </>
    </Providers>
  );
}

export default MyApp;
